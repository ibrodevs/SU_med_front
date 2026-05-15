import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/proxy-backend': {
        target: 'https://su-med-backend-35d3d951c74b.herokuapp.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/proxy-backend/, '')
      },
      '/media': {
        target: 'https://su-med-backend-35d3d951c74b.herokuapp.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/media/, '/media')
      }
    }
  }
});
