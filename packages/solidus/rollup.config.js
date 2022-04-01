import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import { StringFormatter } from '@swindle/core';
import typescriptPlugin from "rollup-plugin-typescript2";
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

const tsPluginOptions = {
  tsconfig: './tsconfig.json',
  check: true,
  clean: true,
  abortOnError: true,
  rollupCommonJSResolveHack: false,
  useTsconfigDeclarationDir: true,
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
        format: "esm",
        file: resolve("dist/browser.js"),
        sourcemap: true,
        globals: globals,
      },
    ],
    plugins: [
      nodePolyfillPlugin(),
      nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        ignoreGlobals: false,
        exclude: ['node_modules/**'],
        exportConditions: ["solid"]
      }),
      typescriptPlugin(tsPluginOptions),
      commonjs({
        include: ['node_modules/**'],
      }),
      babel({
        extensions: [".js", '.jsx', ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true } ], "@babel/preset-typescript"],
        exclude: ["node_modules/**"],
      }),
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
        format: "esm",
        file: resolve("dist/server.js"),
        globals: globals,
      },
    ],
    plugins: [
      nodePolyfillPlugin(),
      nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        ignoreGlobals: false,
        exclude: ['node_modules/**'],
        exportConditions: ["solid"]
      }),
      typescriptPlugin(tsPluginOptions),
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
      nodePolyfillPlugin(),
      typescriptPlugin(tsPluginOptions),
      jsonPlugin(),
      hashbangPlugin(),
      terser(),
    ],
  },
];
