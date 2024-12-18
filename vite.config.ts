import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/pr-reviewer-app/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});