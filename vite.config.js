// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000', // Forward API calls to Flask
    },
  },
})