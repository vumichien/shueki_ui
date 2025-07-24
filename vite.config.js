import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // Inline small assets, separate large ones
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Simplified chunking strategy for better Vercel compatibility
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
            if (id.includes('vue')) {
              return 'vue-vendor'
            }
            // Other node_modules in vendor chunk
            return 'vendor'
          }
        }
      }
    },
    // Ensure proper module format for Vercel
    target: 'es2018',
    minify: 'esbuild',
    sourcemap: false
  },
  server: {
    port: 3000
  },
  // Ensure proper resolution for Vercel
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}) 