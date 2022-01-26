import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import solidRollupConfig from 'rollup-preset-solid';
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';

// const old = {
//   input: "index.ts",
//   output: [
//     {
//       dir: "dist",
//       format: "umd",
//       name: "solidus"
//     }
//   ],
//   external: [
//       "solid-js", 
//       "solid-js/web",
//       "@swindle/core",
//       "@swindle/color",
//       "polka",
//       "serve-static",
//       "solid-app-router",
//       "solid-meta"
//     ],
//   plugins: [
//     nodeResolve({
//       extensions: [".js", ".ts", ".tsx"],
//       exportConditions: ['solid']
//     }),
//     babel({
//       extensions: [".js", ".ts", ".tsx"],
//       babelHelpers: "bundled",
//       presets: ["solid", "@babel/preset-typescript"],
//       exclude: "node_modules/**"
//     })
//   ]
// };

const custom = {
  input: 'index.ts',
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
  ]
}

export default solidRollupConfig(custom);