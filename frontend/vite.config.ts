import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- 1. Importamos el nuevo plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- 2. Lo añadimos aquí
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    }
  }
})