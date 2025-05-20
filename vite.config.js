import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/FrameFlux/', // matches your GitHub Pages repo name exactly
  plugins: [react()],
})
