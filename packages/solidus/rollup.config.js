import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import typescriptPlugin from "@rollup/plugin-typescript";
import hashbangPlugin from "rollup-plugin-hashbang";
import jsonPlugin from "@rollup/plugin-json";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';

// core library external dependencies.
const externals = [
  "@swindle/core",
  "@swindle/color",
  "@swindle/os",
  "@swindle/filesystem",
  "@swindle/container",
  "express",
  "serve-static",
  "solid-js",
  "solid-js/web",
  "solid-app-router",
  "solid-meta",
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
  "babel-preset-solid",
  "rollup-plugin-copy",
  "@rollup/plugin-commonjs"
];

// core library globals.
const globals = {
  "solid-js": "Solid",
  "solid-js/web": "SolidWeb",
  "@swindle/color": "Color",
  "@swindle/core": "Core",
  "express": "Express",
  "path": "Path",
  "solid-app-router": "router",
  "solid-meta": "meta",
  "@swindle/container": "Container"
};

/**
 * The configuration object.
 */

export default [
  // lib
  {
    input: resolve(__dirname, "index.ts"),
    treeshake: false,
    preserveEntrySignatures: false,
    external: externals,
    output: [
      {
        format: "cjs",
        dir: resolve("dist/cjs"),
        sourcemap: true,
        globals: globals,
      },
      {
        format: "esm",
        dir: resolve("dist/esm"),
        sourcemap: true,
        globals: globals,
      },
      {
        name: "solidus",
        format: "umd",
        dir: resolve("dist/umd"),
        sourcemap: true,
        //plugins: [terser()],
        globals: globals,
      },
    ],
    plugins: [
      nodePolyfillPlugin(),
      commonjs(),
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"],
        ignoreGlobals: false,
        exclude: ['node_modules/**']
      }),
      babel({
        extensions: [".js", ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: ["solid", "@babel/preset-typescript"],
        exclude: "node_modules/**",
      }),
      terser(),
    ],
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
      typescriptPlugin(),
      nodePolyfillPlugin(),
      jsonPlugin(),
      hashbangPlugin(),
      terser(),
    ],
  },
];
