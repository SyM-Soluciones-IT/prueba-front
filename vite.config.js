import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './', // specify the project root directory
  plugins: [react()],
  build: {
    outDir: 'dist', // output directory
    emptyOutDir: true, // remove existing files in dist before building
    assetsInlineLimit: 0, // include all files in dist, even small ones
    rollupOptions: {
      input: {
        main: 'index.html', // include index.html
      },
      output: {
        assetFileNames: '[name].[ext]', // preserve file names and extensions
        chunkFileNames: '[name].[ext]', // preserve file names and extensions
      },
    },
    // include _redirects file in dist
    assets: ['_redirects'],
  },
})