import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173, // PORT muhit o'zgaruvchisini ishlatish
  },
  build: {
    sourcemap: true,
  },
  
  optimizeDeps: {
    include: ['@tonconnect/ui-react']
  }
  
});
