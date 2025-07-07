import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  cacheDir: 'C:/temp/vite_cache' // or any other path NOT inside OneDrive
})

