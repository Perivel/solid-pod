import solidRollupConfig from 'rollup-preset-solid';
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';
import typescriptPlugin from '@rollup/plugin-typescript';
import hashbangPlugin from 'rollup-plugin-hashbang';
import jsonPlugin from '@rollup/plugin-json';
import nodePolyfillPlugin from 'rollup-plugin-polyfill-node';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  // lib
  solidRollupConfig({
    input: resolve(__dirname, 'index.ts'),
    external: [
      "@swindle/core",
      "@swindle/color",
      "express", ,
      'solid-js',
      'solid-js/web'
    ],
    output: [
      {
        format: "cjs",
        dir: resolve("dist/cjs"),
        sourcemap: true,
        globals: {
          'solid-js': 'solidjs',
          'solid-js/web': 'web',
          '@swindle/color': 'color',
          '@swindle/core': 'core',
          'express': 'express',
          'path': 'path'
        }
      },
      {
        format: "esm",
        dir: resolve("dist/esm"),
        sourcemap: true,
        globals: {
          'solid-js': 'solidjs',
          'solid-js/web': 'web',
          '@swindle/color': 'color',
          '@swindle/core': 'core',
          'express': 'express',
          'path': 'path'
        }
      },
      {
        name: "solidus",
        format: "umd",
        dir: resolve("dist/umd"),
        sourcemap: true,
        plugins: [terser()],
        globals: {
          'solid-js': 'solidjs',
          'solid-js/web': 'web',
          '@swindle/color': 'color',
          '@swindle/core': 'core',
          'express': 'express',
          'path': 'path'
        }
      },
    ],
    plugins: [
      nodePolyfillPlugin(),
      nodeResolve(),
    ]
  }),
  // CLI
  {
    input: resolve(__dirname, 'cli.ts'),
    external: [
      "@swindle/core",
      "@swindle/color",
      "@swindle/os",
      "@swindle/filesystem",
      "express",
      "serve-static",
      "rollup",
      "@rollup/plugin-node-resolve",
      "@rollup/plugin-babel",
      "@rollup/plugin-json",
      "@rollup/plugin-typescript",
      "rollup-plugin-styles",
      "rollup-plugin-copy",
      "@web/rollup-plugin-import-meta-assets",
      "rollup-plugin-polyfill-node",
      "@rollup/plugin-image"
    ],
    output: [
      {
        file: "./dist/bin/solidus.js",
        format: "cjs",
        globals: {
          // globals
        }
      },
    ],
    plugins: [
      typescriptPlugin(),
      nodePolyfillPlugin(),
      jsonPlugin(),
      hashbangPlugin(),
    ],
  }
];