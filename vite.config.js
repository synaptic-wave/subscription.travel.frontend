import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  publicDir: 'public',
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@/components': '/src/components',
      '@/hooks': '/src/hooks',
      '@/services': '/src/services',
      '@/providers': '/src/providers',
      '@/modules': '/src/modules',
      '@/store': '/src/store',
      '@/router': '/src/router',
      '@/assets': '/src/assets',
      '@/layouts': '/src/layouts',
      '@/consts': '/src/consts',
      '@/locales': '/src/locales',
      '@/utils': '/src/utils'
    }
  }
})
