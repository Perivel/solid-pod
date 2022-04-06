import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import { StringFormatter } from '@swindle/core';
import typescriptPlugin from "rollup-plugin-typescript2";
import jsonPlugin from "@rollup/plugin-json";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
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
deps.forEach(dep => {
    globals[dep] = fmt.camelCase(dep);
});

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
    {
        input: resolve(__dirname, "index.ts"),
        treeshake: false,
        preserveEntrySignatures: false,
        external: externals,
        output: [
            {
                format: "esm",
                file: resolve("dist/index.js"),
                globals: globals,
            },
        ],
        plugins: [
            del({
                targets: ['./dist/*']
            }),
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
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            })
        ],
    },
];
