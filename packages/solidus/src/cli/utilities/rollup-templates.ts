import { RollupOptions } from 'rollup';
import { Process } from '@swindle/os';
import { Path } from '@swindle/filesystem';
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';

/**
 * loadConfigurationOptions()
 * 
 * loads the configuration options specific to the SSR settings.
 * @param mode the SSR Mode to use.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

// export const loadConfigurationOptions = (mode: SSRMode, root: Path = Process.Cwd()): RollupOptions => {
//     let config: RollupOptions = {};

//     if (mode == 'async') {
//         // load async options.
//         config = {
//             input: Path.FromSegments(root, "index.ts").toString(),
//             output: [
//                 {
//                     dir: Path.FromSegments(root, "dist").toString(),
//                     format: "cjs"
//                 }
//             ],
//             preserveEntrySignatures: false,
//             external: ["solid-js", "solid-js/web", "path", "express", "compression", "node-fetch"],
//             plugins: [
//                 nodeResolve({
//                     preferBuiltins: true,
//                     exportConditions: ["solid"],
//                     extensions: [".js", ".jsx", ".ts", ".tsx"]
//                 }),
//                 babel({
//                     babelHelpers: "bundled",
//                     presets: [["solid", { generate: "ssr", hydratable: true, async: true }]]
//                 }),
//                 json()
//             ]
//         }
//     }
//     else if (mode === "sync") {
//         config = {
//             input: Path.FromSegments(root, "index.ts").toString(),
//             output: [
//                 {
//                     dir: Path.FromSegments(root, 'dist').toString(),
//                     format: "cjs"
//                 }
//             ],
//             external: [
//                 "solid-js",
//                 "solid-js/web",
//                 "solidus",
//             ],
//             plugins: [
//                 nodeResolve({
//                     preferBuiltins: true,
//                     exportConditions: ["solid"],
//                     extensions: [".js", ".jsx", ".ts", ".tsx"]
//                 }),
//                 babel({
//                     babelHelpers: "bundled",
//                     presets: [["solid", { generate: "ssr", hydratable: true }]]
//                 }),
//                 json()
//             ],
//             preserveEntrySignatures: false
//         };

//     }
//     else {
//         // load the stream options.
//         config = {
//             input: Path.FromSegments(root, "index.ts").toString(),
//             output: [
//                 {
//                     dir: Path.FromSegments(root, "dist").toString(),
//                     format: "cjs"
//                 }
//             ],
//             external: [
//                 "solid-js",
//                 "solid-js/web",
//                 "solidus"
//             ],
//             plugins: [
//                 nodeResolve({
//                     preferBuiltins: true,
//                     exportConditions: ["solid"],
//                     extensions: [".js", ".jsx", ".ts", ".tsx"]
//                 }),
//                 babel({
//                     babelHelpers: "bundled",
//                     presets: [["solid", { generate: "ssr", hydratable: true }]]
//                 }),
//                 json()
//             ],
//             preserveEntrySignatures: false
//         };
//     }


//     return config;
// }

export const loadConfigurationOptions = (root: Path = Process.Cwd()): RollupOptions => {
    return {
        input: Path.FromSegments(root, "index.ts").toString(),
        output: [
            {
                dir: Path.FromSegments(root, "dist").toString(),
                format: "cjs"
            }
        ],
        external: [
            "solid-js",
            "solid-js/web",
            "solidus"
        ],
        plugins: [
            typescript({
                compilerOptions: {
                    strict: true,
                    target: "ESNext",
                    module: "ESNext",
                    moduleResolution: "node",
                    allowSyntheticDefaultImports: true,
                    esModuleInterop: true,
                    jsx: "preserve",
                    jsxImportSource: "solid-js"
                }
            }),
            styles(),
            nodeResolve({
                preferBuiltins: true,
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "ssr", hydratable: true }]]
            }),
            json()
        ],
        preserveEntrySignatures: false
    }
}

