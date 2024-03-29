import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
import typescriptPlugin from "rollup-plugin-typescript2";
import jsonPlugin from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import del from 'rollup-plugin-delete';
import { StringFormatter } from '@chaperone/util';
import pkg from './package.json' assert { type: 'json' };
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfillPlugin from "rollup-plugin-polyfill-node";

/**
 * rollup configuration for the assembler.
 */

const deps = Object.keys(pkg.dependencies);
const fmt = new StringFormatter();

// core library external dependencies.
const externals = [
    ...deps,
    'solid-js/web',
    'child_process'
];

// core library globals.
const globals = {};
deps.forEach(dep => {
    globals[dep] = fmt.camelCase(dep);
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
    {
        input: resolve(__dirname, "lib/index.ts"),
        treeshake: false,
        preserveEntrySignatures: true,
        external: externals,
        output: [
            {
                format: "esm",
                file: resolve("dist/server.mjs"),
                globals: globals,
            },
            {
                format: 'cjs',
                file: resolve('dist/server.cjs'),
                globals: globals
            }
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
            }),
            jsonPlugin(),
            terser({
                format: {
                    comments: false
                }
            }),
        ],
        treeshake: false
    }
];