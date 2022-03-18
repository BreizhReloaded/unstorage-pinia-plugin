import path from 'path';
import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'UnstoragePiniaPlugin',
      formats: ['cjs', 'es'],
      fileName: (format) => `index.${{cjs: 'cjs', es: 'mjs'}[format]}`
    },
    rollupOptions: {
      external: ['pinia', 'unstorage']
    }
  }
});
