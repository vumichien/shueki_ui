import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // Use relative base path for better compatibility
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 0, // Force all assets to be separate files
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  server: {
    port: 3000
  }
}) 