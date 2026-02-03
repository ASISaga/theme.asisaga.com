import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'assets/js/common/animations.js'),
            name: 'ASISagaAnimations',
            formats: ['es', 'iife'],
            fileName: (format) => `animations.${format}.js`
        },
        outDir: path.resolve(__dirname, 'assets/js/dist'),
        emptyOutDir: false,
        rollupOptions: {
            output: {
                exports: 'named',
                // Don't bundle Motion - it should be loaded separately
                globals: {
                    'motion': 'Motion'
                }
            }
        }
    }
})
