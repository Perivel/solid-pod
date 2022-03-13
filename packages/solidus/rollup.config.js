import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';
import typescriptPlugin from '@rollup/plugin-typescript';
import hashbangPlugin from 'rollup-plugin-hashbang';
import jsonPlugin from '@rollup/plugin-json';
import nodePolyfillPlugin from 'rollup-plugin-polyfill-node';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default [
  // lib
  {
    input: resolve(__dirname, 'index.ts'),
    treeshake: false,
    preserveEntrySignatures: false,
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
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"]
      }),
      babel({
        extensions: [".js", ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: ["solid", "@babel/preset-typescript"],
        exclude: "node_modules/**"
      })
    ]
  },
  
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
      "@rollup/plugin-image",
      // "solid-js",
      // "solid-js/web"
    ],
    output: [
      {
        file: "./dist/bin/solidus.js",
        format: "cjs",
        globals: {
          // globals
          // "@swindle/core": "swindleCore",
          // "@swindle/color": "swindleColor",
          // "@swindle/os": "swindleOS",
          // "@swindle/filesystem": "swindleFS",
          // "express": "express",
          // "serve-static": "serveStatic",
          // "rollup": "rollup",
          // "@rollup/plugin-node-resolve": "resolve",
          // "@rollup/plugin-babel": "babelPlugin",
          // "@rollup/plugin-json": "jsonPlugin",
          // "@rollup/plugin-typescript": "typescriptPlugin",
          // "rollup-plugin-styles": "stylesPlugin",
          // "rollup-plugin-copy": "copyPlugin",
          // "@web/rollup-plugin-import-meta-assets": "assetsPlugin",
          // "rollup-plugin-polyfill-node": "polyfills",
          // "@rollup/plugin-image": "imagePlugin",
          // "solid-js": "solid",
          // "solid-js/web": "web"
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