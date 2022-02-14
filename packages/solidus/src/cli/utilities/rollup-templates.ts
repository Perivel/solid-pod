import { RollupOptions } from 'rollup';
import { Process } from '@swindle/os';
import { Path } from '@swindle/filesystem';
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

/**
 * loadConfigurationOptions()
 * 
 * loads the configuration options specific to the SSR settings.
 * @param mode the SSR Mode to use.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

export const loadConfigurationOptions = (tsconfigOptions: object, root: Path = Process.Cwd()): RollupOptions => {
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
            typescript(tsconfigOptions),
            nodeResolve({
                preferBuiltins: true,
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "ssr", hydratable: true }]]
            }),
            json(),
            styles(),
            importMetaAssets(),
            copy({
                targets: [
                    { src: 'src/assets/**/*', dest: 'dist/src/assets' }
                ]
            })
        ],
        preserveEntrySignatures: false
    }
}

