import { RollupOptions } from 'rollup';
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

export const asyncConfig: RollupOptions =
{
    input: "index.ts",
    output: [
        {
            dir: "async/lib",
            format: "cjs"
        }
    ],
    preserveEntrySignatures: false,
    external: ["solid-js", "solid-js/web", "path", "express", "compression", "node-fetch"],
    plugins: [
        nodeResolve({
            preferBuiltins: true,
            exportConditions: ["solid"],
            extensions: [".js", ".jsx", ".ts", ".tsx"]
        }),
        babel({
            babelHelpers: "bundled",
            presets: [["solid", { generate: "ssr", hydratable: true, async: true }]]
        }),
        json()
    ]
};

export const syncConfig: RollupOptions = {
    input: "index.ts",
    output: [
        {
            dir: "ssr/lib",
            format: "cjs"
        }
    ],
    external: [
        "solid-js",
        "solid-js/web",
        "solidus",
    ],
    plugins: [
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
};

export const streamConfig: RollupOptions = {
    input: "stream/index.js",
    output: [
        {
            dir: "stream/lib",
            format: "cjs"
        }
    ],
    external: [
        "solid-js",
        "solid-js/web",
        "solidus"
    ],
    plugins: [
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