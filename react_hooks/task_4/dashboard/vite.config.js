import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/holbertonschool-web_react/',
  define: {
    __BASE_URL__: JSON.stringify('/holbertonschool-web_react/'),
  },
})
