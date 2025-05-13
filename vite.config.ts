import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct asset loading on Vercel and other static hosts
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: 'dist', // This is the folder Vercel will serve
    emptyOutDir: true
  }
});
