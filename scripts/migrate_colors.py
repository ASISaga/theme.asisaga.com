#!/usr/bin/env python3
"""
migrate_colors.py - Single-pass color tokenization for Genesis ontology engines.

Replaces every hardcoded oklch() literal in _sass/ontology/engines/ with
a $color-* Sass variable defined in _sass/design/_colors-generated.scss.

Algorithm:
1. Build value→varname map from existing _colors-generated.scss
2. Collect all static oklch() values from engine .scss files
3. For unmapped values, generate semantic names and add to _design/tokens/2-color.json
4. Regenerate _colors-generated.scss via Style Dictionary
5. Replace all hardcoded values in engine files (context-aware interpolation)
"""

import re, json, subprocess, sys
from pathlib import Path

REPO          = Path(__file__).parent.parent
COLORS_GEN    = REPO / "_sass/design/_colors-generated.scss"
TOKEN_JSON    = REPO / "_design/tokens/2-color.json"
ENGINES_DIR   = REPO / "_sass/ontology/engines"
SD_CONFIG     = REPO / ".github/skills/style-dictionary/sd.config.mjs"

SKIP_FILES = {"_fontawesome.scss"}
SKIP_DIRS  = {"vendor"}


# ─── helpers ────────────────────────────────────────────────────────────────

def normalize(v: str) -> str:
    return re.sub(r'\s+', ' ', v.strip())

def parse_oklch(v: str):
    """
    Parse 'oklch(L C H)' or 'oklch(L C H / A)' → (L, C, H, A|None).
    NOTE: 'oklch(' is 6 chars, so inner content starts at index 6.
    """
    if not (v.startswith("oklch(") and v.endswith(")")):
        return None
    inner = v[6:-1].strip()          # skip 'oklch(' (6 chars) and trailing ')'
    halves = inner.split("/", 1)
    nums = halves[0].strip().split()
    if len(nums) < 3:
        return None
    try:
        L, C, H = float(nums[0]), float(nums[1]), float(nums[2])
        A = float(halves[1].strip()) if len(halves) == 2 else None
        return L, C, H, A
    except ValueError:
        return None

def hue_family(H: float, C: float) -> str:
    if C < 0.03:   return "neutral"
    if H < 20 or H >= 350: return "red"
    if H < 45:     return "error"
    if H < 70:     return "amber"
    if H < 110:    return "gold"
    if H < 155:    return "green"
    if H < 185:    return "teal"
    if H < 215:    return "cyan"
    if H < 248:    return "blue"
    if H < 270:    return "indigo"
    if H < 298:    return "violet"
    if H < 330:    return "purple"
    return "rose"

def lightness_shade(L: float) -> str:
    if L < 0.06:  return "abyss"
    if L < 0.12:  return "void"
    if L < 0.20:  return "deep"
    if L < 0.30:  return "dark"
    if L < 0.40:  return "dim"
    if L < 0.55:  return "mid"
    if L < 0.68:  return "rich"
    if L < 0.78:  return "light"
    if L < 0.88:  return "pale"
    if L < 0.95:  return "bright"
    return "luminous"

def semantic_base(v: str) -> str:
    """Compute deterministic base name for a value (without collision suffix)."""
    p = parse_oklch(v)
    if not p:
        return f"gen-raw-{abs(hash(v)) % 9999999:07d}"
    L, C, H, A = p
    fam   = hue_family(H, C)
    shade = lightness_shade(L)
    base  = f"gen-{fam}-{shade}"
    if A is not None:
        base += f"-a{round(A * 100):02d}"
    return base


# ─── file helpers ───────────────────────────────────────────────────────────

def engine_files() -> list:
    files = []
    for f in ENGINES_DIR.rglob("*.scss"):
        rel = f.relative_to(ENGINES_DIR).parts
        if any(p in SKIP_DIRS for p in rel):
            continue
        if f.name in SKIP_FILES:
            continue
        files.append(f)
    return sorted(files)


def existing_token_map() -> dict:
    """Return {normalized_oklch_value: first_varname} from _colors-generated.scss."""
    m = {}
    pat = re.compile(r'^\$(\S+):\s*(oklch\([^;]+?)\s*;')
    for line in COLORS_GEN.read_text().splitlines():
        hit = pat.match(line.strip())
        if hit:
            val = normalize(hit.group(2).rstrip(";"))
            if val not in m:
                m[val] = hit.group(1)
    return m


def static_values_in_files(files: list) -> set:
    """Collect all static (non-parameterized) oklch() values from files."""
    s = set()
    for f in files:
        for m in re.finditer(r'oklch\([^)]+\)', f.read_text()):
            v = m.group(0)
            if "$" in v or "#{" in v:
                continue
            s.add(normalize(v))
    return s


# ─── token generation ───────────────────────────────────────────────────────

def generate_tokens(unmapped: set, existing_varnames: set) -> dict:
    """
    For each unmapped value, compute a unique semantic name and build token dict.

    Returns {short_key: {$type, $value, $description}}
    where short_key e.g. 'gen-gold-pale-a30' uniquely identifies the token.
    Used names include both the 'gen-*' short form AND the eventual
    'color-engine-*' long form to prevent any collisions.
    """
    used = set(existing_varnames)          # seed with e.g. "color-surface-primary"
    tokens = {}                            # short_key → token_def

    for v in sorted(unmapped):             # deterministic order
        base = semantic_base(v)
        short = base
        n = 2
        # Dedup against: short keys already chosen AND their color-engine- equivalents
        while (short in used) or (("color-engine-" + short[4:]) in used if short.startswith("gen-") else (short in used)):
            short = f"{base}-{n}"
            n += 1
        used.add(short)
        if short.startswith("gen-"):
            used.add("color-engine-" + short[4:])  # also block the long form

        p = parse_oklch(v)
        if p:
            L, C, H, A = p
            fam = hue_family(H, C)
            alpha = f" at {round(A*100)}% opacity" if A is not None else ""
            desc = f"{fam.capitalize()} L={L:.2f}{alpha}"
        else:
            desc = f"Engine color {v}"

        tokens[short] = {"$type": "color", "$value": v, "$description": desc}

    return tokens


def update_json(tokens: dict):
    """Insert new tokens into _design/tokens/2-color.json under color.engine.*"""
    with open(TOKEN_JSON) as f:
        data = json.load(f)
    data.setdefault("color", {}).setdefault("engine", {})

    for short, tok in tokens.items():
        # short: "gen-{family}-{shade}" or "gen-{family}-{shade}-aNNN" etc.
        parts = short.split("-")
        if len(parts) >= 3 and parts[0] == "gen":
            fam = parts[1]
            key = "-".join(parts[2:])
        else:
            fam, key = "misc", short
        data["color"]["engine"].setdefault(fam, {})[key] = tok

    with open(TOKEN_JSON, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def regenerate():
    r = subprocess.run(["node", str(SD_CONFIG)], cwd=str(REPO),
                       capture_output=True, text=True)
    if r.returncode:
        print("ERROR: style-dictionary build failed:\n", r.stderr)
        sys.exit(1)


# ─── replacement ────────────────────────────────────────────────────────────

def context(content: str, match_start: int) -> str:
    """
    Determine replacement context for an oklch() at byte position match_start.
    Returns 'custom-prop' (needs #{...} interpolation) or 'regular'.
    """
    # Find line boundaries
    ls = content.rfind("\n", 0, match_start) + 1
    le = content.find("\n", match_start)
    le = le if le >= 0 else len(content)
    line = content[ls:le]
    col  = match_start - ls

    before = line[:col]

    # 1. Check if inside a var() fallback
    depth = 0
    for i in range(col - 1, -1, -1):
        ch = line[i]
        if ch == ")":
            depth += 1
        elif ch == "(":
            if depth:
                depth -= 1
            else:
                if i >= 3 and line[max(0,i-3):i].lower() == "var":
                    return "regular"   # var() fallback → no interpolation
                break

    # 2. Check if CSS custom property definition (line starts --varname:)
    stripped = before.lstrip()
    if stripped.startswith("--"):
        colon = stripped.find(":")
        paren = stripped.find("(")
        if colon >= 0 and (paren < 0 or colon < paren):
            return "custom-prop"

    return "regular"


def replace_in_file(path: Path, val_map: dict) -> int:
    """
    Replace all static oklch() values in path according to val_map.
    Returns number of replacements made.
    """
    content = path.read_text()
    if not any(v in content for v in val_map):
        return 0

    # Sort by length descending to avoid partial substitution
    ordered = sorted(val_map.keys(), key=len, reverse=True)

    total = 0
    for val in ordered:
        if val not in content:
            continue
        varname = val_map[val]
        var_ref = f"${varname}"
        escaped = re.escape(val)

        parts = []
        last  = 0
        for m in re.finditer(escaped, content):
            s = m.start()
            # Skip if already inside #{ ... }
            if s >= 2 and content[s-2:s] == "#{":
                parts.append(content[last:m.end()])
                last = m.end()
                continue
            ctx = context(content, s)
            repl = f"#{{{var_ref}}}" if ctx == "custom-prop" else var_ref
            parts.append(content[last:s])
            parts.append(repl)
            last = m.end()
            total += 1
        parts.append(content[last:])
        content = "".join(parts)

    if total:
        path.write_text(content)
    return total


# ─── main ───────────────────────────────────────────────────────────────────

def main():
    sep = "=" * 60
    print(sep)
    print("Genesis Color Migration: oklch() → $color-* tokens")
    print(sep)

    # 1. existing tokens
    print("\n[1/5] Loading existing color tokens...")
    val_map = existing_token_map()
    print(f"    {len(val_map)} existing mappings")

    # 2. collect values
    print("\n[2/5] Scanning engine files...")
    files = engine_files()
    all_vals = static_values_in_files(files)
    print(f"    {len(files)} files, {len(all_vals)} unique static oklch() values")

    # 3. new tokens
    unmapped = all_vals - set(val_map)
    print(f"\n[3/5] Generating {len(unmapped)} new tokens "
          f"({len(all_vals) - len(unmapped)} already exist)...")
    if unmapped:
        new_toks = generate_tokens(unmapped, set(val_map.values()))
        update_json(new_toks)
        print(f"    Added {len(new_toks)} tokens to 2-color.json")
    else:
        new_toks = {}

    # 4. regenerate
    print("\n[4/5] Regenerating _colors-generated.scss...")
    regenerate()
    val_map = existing_token_map()
    print(f"    Token map now has {len(val_map)} entries")

    # sanity: all values now mapped?
    still = static_values_in_files(files) - set(val_map)
    if still:
        print(f"    WARNING: {len(still)} values still unmapped after regen:")
        for v in sorted(still)[:10]:
            print(f"      {v}")

    # 5. replace
    print("\n[5/5] Replacing oklch() in engine files...")
    total_reps = 0
    modified   = 0
    for f in files:
        n = replace_in_file(f, val_map)
        if n:
            modified  += 1
            total_reps += n
    print(f"    Modified {modified} files, {total_reps} replacements")

    # verification
    remaining = sum(
        1 for f in files
        for m in re.finditer(r'oklch\([^)]+\)', f.read_text())
        if "$" not in m.group(0) and "#{" not in m.group(0)
    )
    print(f"\nSummary:")
    print(f"  New tokens: {len(new_toks)}")
    print(f"  Files modified: {modified}")
    print(f"  Remaining static oklch(): {remaining}  (target: 0)")

    # cross-check: all $color-engine-* refs are defined
    defined = {
        ln.split(":")[0].lstrip("$")
        for ln in COLORS_GEN.read_text().splitlines()
        if ln.startswith("$color-engine-")
    }
    referenced = set()
    for f in files:
        for m in re.finditer(r'\$color-engine-[a-z0-9-]+', f.read_text()):
            referenced.add(m.group(0).lstrip("$"))
    undefined = referenced - defined
    if undefined:
        print(f"\n  WARNING: {len(undefined)} $color-engine-* refs not in generated SCSS:")
        for v in sorted(undefined)[:15]:
            print(f"    ${v}")
    else:
        print(f"  All {len(referenced)} $color-engine-* references are defined ✓")

if __name__ == "__main__":
    main()
