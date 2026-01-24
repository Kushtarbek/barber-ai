import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { strictPort: false },
  preview: { strictPort: false, open: true },
});
