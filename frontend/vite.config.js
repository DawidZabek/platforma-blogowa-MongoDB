import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/notifications/stream": {
        target: "http://localhost:3000",
        changeOrigin: true,
        headers: { "Connection": "keep-alive" },
      },
      "/api": "http://localhost:3000"
    }
  }
})