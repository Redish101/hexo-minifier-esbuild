import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['index.ts'],
    minify: true,
    target: 'node18',
    clean: true,
    bundle: false
})