import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import typescriptPlugin from "@rollup/plugin-typescript";
import hashbangPlugin from "rollup-plugin-hashbang";
import jsonPlugin from "@rollup/plugin-json";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';

export default [
  // lib
  {
    input: resolve(__dirname, "index.ts"),
    treeshake: false,
    preserveEntrySignatures: false,
    external: [
      "@swindle/core",
      "@swindle/color",
      "express",
      "solid-js",
      "solid-js/web",
    ],
    output: [
      {
        format: "cjs",
        dir: resolve("dist/cjs"),
        sourcemap: true,
        globals: {
          "solid-js": "Solid",
          "solid-js/web": "SolidWeb",
          "@swindle/color": "Color",
          "@swindle/core": "Core",
          express: "Express",
          path: "Path",
        },
      },
      {
        format: "esm",
        dir: resolve("dist/esm"),
        sourcemap: true,
        globals: {
          "solid-js": "Solid",
          "solid-js/web": "SolidWeb",
          "@swindle/color": "Color",
          "@swindle/core": "Core",
          express: "Express",
          path: "Path",
        },
      },
      {
        name: "solidus",
        format: "umd",
        dir: resolve("dist/umd"),
        sourcemap: true,
        plugins: [terser()],
        globals: {
          "solid-js": "Solid",
          "solid-js/web": "SolidWeb",
          "@swindle/color": "Color",
          "@swindle/core": "Core",
          express: "Express",
          path: "Path",
        },
      },
    ],
    plugins: [
      nodePolyfillPlugin(),
      commonjs(),
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"],
        ignoreGlobals: false,
        include: ['node_modules/**']
      }),
      babel({
        extensions: [".js", ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: ["solid", "@babel/preset-typescript"],
        exclude: "node_modules/**",
      }),
    ],
  },

  // CLI
  {
    input: resolve(__dirname, "cli.ts"),
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
        format: "esm",
      },
    ],
    plugins: [
      typescriptPlugin(),
      nodePolyfillPlugin(),
      jsonPlugin(),
      hashbangPlugin(),
    ],
  },
];
