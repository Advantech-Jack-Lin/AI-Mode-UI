import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    // Add bundle analyzer for analyze mode
    mode === 'analyze' && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  
  // Build optimizations
  build: {
    // Enable source maps for better debugging
    sourcemap: true,
    
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Manual chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue'],
          'utils': [
            './src/composables/usePerformance.ts',
            './src/composables/useTheme.ts',
            './src/composables/useErrorHandler.ts'
          ]
        }
      }
    }
  },

  // Development server optimizations
  server: {
    // Enable HMR for better development experience
    hmr: true,
    // Warm up frequently used files
    warmup: {
      clientFiles: [
        './src/components/*.vue',
        './src/composables/*.ts'
      ]
    }
  },

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@composables': resolve(__dirname, 'src/composables'),
      '@types': resolve(__dirname, 'src/types')
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['vue', 'bootstrap/dist/css/bootstrap.min.css'],
    // Exclude dependencies that should not be pre-bundled
    exclude: []
  }
}))
