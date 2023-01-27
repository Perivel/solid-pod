import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import typescriptPlugin from "rollup-plugin-typescript2";
import jsonPlugin from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import hashbang from "rollup-plugin-hashbang";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import pkg from './package.json' assert { type: 'json' };

const deps = Object.keys(pkg.dependencies);

// core library external dependencies.

const baseExternals = [...deps];
const browserExternals = [...baseExternals];
const serverExternals = [
    ...baseExternals,
    'solid-js/web',
    'path'
];
const cliExternals = [
    ...baseExternals,
    'solid-js/web',
    'child_process'
];


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
        input: resolve(__dirname, "lib/index.ts"),
        treeshake: true,
        preserveEntrySignatures: true,
        external: browserExternals,
        output: [
            {
                format: "esm",
                file: resolve("dist/browser.js"),
            },
        ],
        plugins: [
            del({
                targets: ['./dist']
            }),
            nodePolyfillPlugin(),
            nodeResolve({
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                ignoreGlobals: false,
                exportConditions: ["solid"],
                exclude: ['node_modules/**'],
            }),
            typescriptPlugin(tsPluginOptions),
            babel({
                extensions: [".js", '.jsx', ".ts", ".tsx"],
                babelHelpers: "bundled",
                presets: [
                    ["solid", { generate: "dom", hydratable: true }], 
                    "@babel/preset-typescript"
                ],
            }),
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            })
        ],
    },

    // server library
    {
        input: resolve(__dirname, "lib/index.ts"),
        treeshake: true,
        preserveEntrySignatures: true,
        external: serverExternals,
        output: [
            {
                format: "esm",
                file: resolve("dist/server.js"),
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
            commonjs(),
            babel({
                extensions: [".js", '.jsx', ".ts", ".tsx"],
                babelHelpers: "bundled",
                presets: [["solid", { generate: "ssr", hydratable: true, async: true }], "@babel/preset-typescript"],
            }),
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            }),
        ],
    },
     // CLI
     {
        input: resolve(__dirname, "cli/index.ts"),
        external: cliExternals,
        output: [
            {
                file: "./dist/bin/solidus.js",
                format: "esm",
            },
        ],
        plugins: [
            nodePolyfillPlugin(),
            typescriptPlugin(tsPluginOptions),
            commonjs(),
            jsonPlugin(),
            hashbang(),
            terser(),
        ],
    },
];