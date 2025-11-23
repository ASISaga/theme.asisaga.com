import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(process.env.NODE_MODULES_PATH || 'node_modules', '@popperjs/core/lib/index.js'),
            name: 'Popper',
            formats: ['es'],
            fileName: () => 'popper.esm.js'
        },
        outDir: path.resolve(process.env.VENDOR_DIR || 'theme.asisaga.com/assets/js/vendor'),
        emptyOutDir: false,
        rollupOptions: {
            output: {
                exports: 'named'
            }
        }
    }
})
