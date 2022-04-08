import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import { StringFormatter } from '@swindle/core';
import typescriptPlugin from "rollup-plugin-typescript2";
import jsonPlugin from "@rollup/plugin-json";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { dependencies, devDependencies } from './package.json';

const deps = Object.keys(dependencies);

// core library external dependencies.
const externals = [
    ...deps,
    ...Object.keys(devDependencies),
    'solid-js/web'
].filter(dep => dep !== 'solid-app-router');

// core library globals.
const fmt = new StringFormatter();
const globals = {};
deps.forEach(dep => {
    if (dep !== 'solid-app-router') {
        globals[dep] = fmt.camelCase(dep)
    }
});
globals['solid-js/web'] = fmt.camelCase('solid-js/web');

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
        preserveEntrySignatures: true,
        external: externals,
        output: [
            {
                format: "esm",
                file: resolve("dist/browser.js"),
                globals: globals,
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
            commonjs(),
            babel({
                extensions: [".js", '.jsx', ".ts", ".tsx"],
                babelHelpers: "bundled",
                presets: [["solid", { generate: "dom", hydratable: true }], "@babel/preset-typescript"],
            }),
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            })
        ],
        treeshake: false
    },

    // server library
    {
        input: resolve(__dirname, "index.ts"),
        treeshake: false,
        preserveEntrySignatures: true,
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
        treeshake: false
    },
];
