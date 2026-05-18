import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HomebaseToolkit',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['@internationalized/date'],
    },
  },
});
