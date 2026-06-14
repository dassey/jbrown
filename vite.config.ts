import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://<user>.github.io/jbrown/ on GitHub Pages, so production
// assets load from the "/jbrown/" base. Routing uses a HashRouter (no 404 trick
// needed). The 3D view is lazy-loaded so three.js doesn't bloat first paint.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/jbrown/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep three.js out of the main bundle; it loads only when the
        // 3D view is opened (the view component is React.lazy'd).
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
}))
