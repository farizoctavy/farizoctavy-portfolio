import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages serves the site from /farizoctavy-portfolio/, while Netlify
// (and local dev) serve it from the domain root.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig(() => ({
  base: isGitHubPages ? '/farizoctavy-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
}))
