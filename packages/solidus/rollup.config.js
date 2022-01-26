import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "umd",
      name: "solidus"
    }
  ],
  external: [
      "solid-js", 
      "solid-js/web",
      "@swindle/core",
      "@swindle/color",
      "polka",
      "serve-static"
    ],
  plugins: [
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
};