````prompt
Title: Build Popper bundle with Vite (build_popper)

tool: build_popper

Purpose
- Build a bundled `popper.esm.js` file using the site's `vite.config.js` so the theme vendor can be served without resolving bare import specifiers.

Input schema
```json
{
  "type": "object",
  "properties": {
    "nodeModulesPath": { "type": "string", "description": "Path to node_modules directory (required)" },
    "vendorDir": { "type": "string", "description": "Path to destination vendor directory (required)" },
    "viteConfig": { "type": "string", "description": "Optional path to vite.config.js (defaults to project root vite.config.js)" }
  },
  "required": ["nodeModulesPath", "vendorDir"]
}
```

Example payload
```json
{
  "nodeModulesPath": "c:/Development/ASISaga/Website/node_modules",
  "vendorDir": "c:/Development/ASISaga/Website/theme.asisaga.com/assets/js/vendor",
  "viteConfig": "c:/Development/ASISaga/Website/vite.config.js"
}
```

Example MCP call
```json
{
  "name": "build_popper",
  "arguments": {
    "nodeModulesPath": "c:/Development/ASISaga/Website/node_modules",
    "vendorDir": "c:/Development/ASISaga/Website/theme.asisaga.com/assets/js/vendor",
    "viteConfig": "c:/Development/ASISaga/Website/vite.config.js"
  }
}
```

Expected output (example)
```json
{
  "success": true,
  "message": "Vite build completed",
  "output": "c:/Development/ASISaga/Website/theme.asisaga.com/assets/js/vendor/popper.esm.js"
}
```

Notes
- The MCP tool runs `npx vite build --config <vite_config>` in the directory containing the config. Ensure Node.js and `npx` are available in the server environment.
- Provide absolute paths for reliability when invoking from the MCP server.
- The tool will copy the resulting `popper.esm.js` into the provided `vendorDir` when possible.

````
