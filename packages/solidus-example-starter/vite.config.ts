import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    //these fields are necessary for server side rendering with Solidus.
    manifest: true,
    rollupOptions: {
      input: 'index.ts',
      external: ['solidus']
    }
  },
});
