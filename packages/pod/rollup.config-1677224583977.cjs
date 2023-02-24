'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rollupPluginTerser = require('rollup-plugin-terser');
var path = require('path');
var typescriptPlugin = require('rollup-plugin-typescript2');
var jsonPlugin = require('@rollup/plugin-json');
var nodeResolve = require('@rollup/plugin-node-resolve');
var babel = require('@rollup/plugin-babel');
var del = require('rollup-plugin-delete');
var commonjs = require('@rollup/plugin-commonjs');
var hashbang = require('rollup-plugin-hashbang');
var nodePolyfillPlugin = require('rollup-plugin-polyfill-node');
var pkg = require('./package.json');

const deps = Object.keys(pkg.dependencies);

// core library external dependencies.

const baseExternals = [...deps];
const browserExternals = [...baseExternals];
const serverExternals = [
    ...baseExternals,
    'solid-js/web',
    'path',
];
const cliExternals = [
    ...baseExternals,
    'solid-js/web',
    'child_process',
    'solid-pod/assembler',
    '@chaperone/util/container'
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

var rollup_config = [
    // client library
    {
        input: path.resolve(__dirname, "lib/index.ts"),
        treeshake: true,
        preserveEntrySignatures: true,
        external: browserExternals,
        output: [
            {
                format: "esm",
                file: path.resolve("dist/browser.js"),
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
            rollupPluginTerser.terser({
                format: {
                    comments: false
                }
            })
        ],
    },

    // server library
    {
        input: path.resolve(__dirname, "lib/index.ts"),
        treeshake: true,
        preserveEntrySignatures: true,
        external: serverExternals,
        output: [
            {
                format: "esm",
                file: path.resolve("dist/server.js"),
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
            rollupPluginTerser.terser({
                format: {
                    comments: false
                }
            }),
        ],
    },
     // CLI
     {
        input: path.resolve(__dirname, "cli/index.ts"),
        external: cliExternals,
        output: [
            {
                file: "./dist/bin/cli.mjs",
                format: "esm",
            },
        ],
        plugins: [
            nodePolyfillPlugin(),
            typescriptPlugin(tsPluginOptions),
            commonjs(),
            jsonPlugin(),
            hashbang(),
            rollupPluginTerser.terser(),
        ],
    },
];

exports.default = rollup_config;
