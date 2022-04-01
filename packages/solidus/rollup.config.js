import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import { StringFormatter } from '@swindle/core';
import typescriptPlugin from "@rollup/plugin-typescript";
import hashbangPlugin from "rollup-plugin-hashbang";
import jsonPlugin from "@rollup/plugin-json";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';

import { dependencies, devDependencies } from './package.json';

const deps = Object.keys(dependencies);

// core library external dependencies.
const externals = [
  ...deps,
  ...Object.keys(devDependencies),
];

// core library globals.
const fmt = new StringFormatter();
const globals = {};
deps.forEach(dep => globals[dep] = fmt.camelCase(dep));

// default tsconfig
const tsconfig = {
  strict: true,
  target: "ESNext",
  module: "ESNext",
  moduleResolution: "node",
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: "preserve",
  jsxImportSource: "solid-js",
};

/**
 * The configuration object.
 */

export default [
  // client library
  {
    input: resolve(__dirname, "index.ts"),
    treeshake: false,
    preserveEntrySignatures: false,
    external: externals,
    output: [
      {
        name: 'solidusjs',
        format: "umd",
        file: resolve("dist/browser.js"),
        sourcemap: true,
        globals: globals,
        name: 'solidusjsclient',
      },
    ],
    plugins: [
      typescriptPlugin(tsconfig),
      nodePolyfillPlugin(),
      nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        ignoreGlobals: false,
        exclude: ['node_modules/**'],
        exportConditions: ["solid"]
      }),
      commonjs({
        include: ['node_modules/**'],
      }),
      babel({
        extensions: [".js", '.jsx', ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true } ], "@babel/preset-typescript"],
        exclude: ["node_modules/**"],
      }),
      //terser(),
    ],
    treeshake: false
  },

  // server library
  {
    input: resolve(__dirname, "index.ts"),
    treeshake: false,
    preserveEntrySignatures: false,
    external: externals,
    output: [
      {
        name: 'solidusjs',
        format: "umd",
        file: resolve("dist/server.js"),
        sourcemap: true,
        globals: globals,
        name: 'solidusjsserver',
        exports: 'named'
      },
    ],
    plugins: [
      typescriptPlugin(tsconfig),
      nodePolyfillPlugin(),
      nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        ignoreGlobals: false,
        exclude: ['node_modules/**'],
        exportConditions: ["solid"]
      }),
      commonjs({
        include: ['node_modules/**'],
      }),
      babel({
        extensions: [".js", '.jsx', ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true, async: true }], "@babel/preset-typescript"],
        exclude: ["node_modules/**"],
        
      }),
      //terser(),
    ],
    treeshake: false
  },

  // CLI
  {
    input: resolve(__dirname, "cli.ts"),
    external: externals,
    output: [
      {
        file: "./dist/bin/solidus.js",
        format: "esm",
        globals: globals,
      },
    ],
    plugins: [
      typescriptPlugin(tsconfig),
      nodePolyfillPlugin(),
      jsonPlugin(),
      hashbangPlugin(),
      terser(),
    ],
  },
];
