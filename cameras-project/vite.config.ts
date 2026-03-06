import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/power-consumption-of-cameras-tauri/',
  server: { 
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  plugins: [react()],
})
