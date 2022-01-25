import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'Solidus',
      fileName: (format) => `solidus.${format}.js`
    },
    target: 'esnext',
    polyfillDynamicImport: false,
    manifest: true,
    rollupOptions: {
      external: [
        '@swindle/color',
        '@swindle/core',
        'polka',
        'serve-static',
        'solid-js',
        'path'
      ]
    }
  },
});
