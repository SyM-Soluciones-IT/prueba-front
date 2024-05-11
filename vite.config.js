import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Agrega una regla para copiar el archivo _redirects al directorio de salida
  build: {
    rollupOptions: {
      input: {
        main: './src/main.jsx'
      },
      output: {
        // otros ajustes de salida...
      },
    },
    // Copia el archivo _redirects al directorio de salida
    assetsInlineLimit: 0,
    assets: {
      // Copia el archivo _redirects sin procesar al directorio de salida
      // Esto evita que se procese o renombre el archivo
      rawBase: './public',
      // Incluye el archivo _redirects en el directorio de salida
      include: ['**/_redirects']
    }
  }
})
