---
description: "Build a bundled Popper (popper.esm.js) using the site's Vite config"
name: "build_popper"
argument-hint: "Provide workspace-relative paths (use ${workspaceFolder})"
agent: "agent"
tools:
  ['buddhi-mcp/build_popper']
---

#tool:buddhi-mcp/build_popper
```json
{
  "nodeModulesPath": "${workspaceFolder}/Website/node_modules",
  "vendorDir": "${workspaceFolder}/Website/theme.asisaga.com/assets/js/vendor",
  "viteConfig": "${workspaceFolder}/Website/theme.asisaga.com/vite.config.js"
}
```

## Related Documentation

→ **Build Process**: `/docs/specifications/build-deployment.md`
→ **JavaScript Architecture**: `/docs/specifications/javascript.md`
→ **Agent Guidelines**: `/docs/specifications/github-copilot-agent-guidelines.md`
