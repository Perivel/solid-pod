import { RollupOptions } from 'rollup';
import { Process } from '@swindle/os';
import { Path } from '@swindle/filesystem';
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import nodePolyfill from 'rollup-plugin-polyfill-node';

/**
 * loadBuildConfigurationOptions()
 * 
 * loads the configuration options for building the application.
 * @param mode the SSR Mode to use.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

export const loadBuildConfigurationOptions = (tsconfigOptions: object, root: Path = Process.Cwd()): RollupOptions => {
    return <RollupOptions> {
        input: Path.FromSegments(root, "src", "index.ts").toString(),
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
            nodePolyfill(),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "ssr", hydratable: true }]],
            }),
            json(),
            styles(),
            copy({
                targets: [
                    { src: 'src/assets/**/*', dest: 'dist/src/assets' }
                ]
            }),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };
}

