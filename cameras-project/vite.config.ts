import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'
import { api_proxy_addr, img_proxy_addr } from './src/target_config'

const basePath = process.env.VITE_BASE_PATH || '/'

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  publicDir: 'public',
  server: { 
    port: 3000,
    host: '10.118.136.198',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert-chain.crt')),
    },
    cors: {
      origin: [
        'tauri://localhost',
        'https://liza05444.github.io',
      ],
      credentials: true,
    },
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
        secure: false,
      },
      "/img-proxy": {
        target: img_proxy_addr,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/img-proxy/, ""),
      },
    },
    watch: {
      usePolling: true,
    },
    strictPort: true,
  },
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "De Broglie Project",
        short_name: "De Broglie",
        start_url: ".",
        scope: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#387ef6",
        orientation: "portrait-primary",
        icons: [
          {
            src: "logo.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "logo.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
      }
    })
  ],
})
