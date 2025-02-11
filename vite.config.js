import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access
    port: 5173, // Ensure a proper port
  },
  preview: {
    allowedHosts: ["leaflet-map-demo.onrender.com"],
  },
})
