import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { pluginCasos } from './vite/casos'

const pastaCasos = fileURLToPath(new URL('./src/assets/casos', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), pluginCasos(pastaCasos)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
})
