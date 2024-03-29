import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, '../')
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
