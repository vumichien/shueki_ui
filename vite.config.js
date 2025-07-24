import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/', // Use absolute path for SPA routing
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 0, // Force all assets to be separate files
    // Set chunk size warning limit to 500kb
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Manual chunking for better code splitting
        manualChunks(id) {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // Chart.js in separate chunk
            if (id.includes('chart.js')) {
              return 'chart'
            }
            // Quill editor in separate chunk
            if (id.includes('@vueup/vue-quill') || id.includes('quill')) {
              return 'editor'
            }
            // Vue and router in vendor chunk
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            // Other node_modules in vendor chunk
            return 'vendor'
          }
          
          // Admin pages chunk
          if (id.includes('/pages/Admin') || id.includes('/pages/System')) {
            return 'admin'
          }
        }
      }
    }
  },
  server: {
    port: 3000
  }
}) 