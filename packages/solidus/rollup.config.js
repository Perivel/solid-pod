import solidRollupConfig from 'rollup-preset-solid';
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';
import typescriptPlugin from '@rollup/plugin-typescript';
import hashbangPlugin from 'rollup-plugin-hashbang';
import jsonPlugin from '@rollup/plugin-json';
import nodePolyfillPlugin from 'rollup-plugin-polyfill-node';

export default [
  solidRollupConfig({
    input: resolve(__dirname, 'index.ts'),
    external: [
      "@swindle/core",
      "@swindle/color",
      "polka",
      "serve-static",
    ],
    output: [
      {
        format: "cjs",
        dir: resolve("dist/cjs"),
        sourcemap: true,
      },
      {
        format: "esm",
        dir: resolve("dist/esm"),
        sourcemap: true,
      },
      {
        name: "solidus",
        format: "umd",
        dir: resolve("dist/umd"),
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      nodePolyfillPlugin()
    ]
  }),
  // The CLI
  {
    input: resolve(__dirname, 'cli.ts'),
    external: [
      "@swindle/core",
      "@swindle/color",
      "@swindle/os",
      "@swindle/filesystem",
      "polka",
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
    output: {
      file: "./dist/bin/solidus.js",
      format: "cjs"
    },
    plugins: [
      typescriptPlugin(),
      nodePolyfillPlugin(),
      jsonPlugin(),
      hashbangPlugin(),
    ]
  }
];