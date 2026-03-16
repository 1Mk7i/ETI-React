import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // use relative paths so static assets resolve correctly regardless of
  // the URL the app is served from (works better on GitHub Pages)
  base: './',
  plugins: [react()],
})
