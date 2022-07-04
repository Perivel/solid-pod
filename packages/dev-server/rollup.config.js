import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import typescriptPlugin from "rollup-plugin-typescript2";
import jsonPlugin from "@rollup/plugin-json";
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { dependencies, devDependencies } from './package.json';
import { camelCase } from 'change-case';

const deps = Object.keys(dependencies);

// core library external dependencies.
const externals = [
    ...deps,
    ...Object.keys(devDependencies),
    'solid-js/web',
    'path'
];

// core library globals.
const globals = {};
deps.forEach(dep => {
    globals[dep] = camelCase(dep);
});
globals['solid-js/web'] = camelCase('solid-js/web');
globals['path'] = 'path';

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
        input: resolve(__dirname, "lib/index.ts"),
        treeshake: false,
        preserveEntrySignatures: true,
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
                targets: ['./dist']
            }),
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
                exclude: ["node_modules/**"],

            }),
            jsonPlugin(),
            terser(),
        ],
        treeshake: false
    },
];