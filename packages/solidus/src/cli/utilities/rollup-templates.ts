/*
BSD 2-Clause License

Copyright (c) 2022, Perivel LLC
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import { RollupOptions } from 'rollup';
import { Process } from '@swindle/os';
import { Path } from '@swindle/filesystem';
import nodeResolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import nodePolyfill from 'rollup-plugin-polyfill-node';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';

/**
 * loadBuildConfigurationOptions()
 * 
 * loads the configuration options for building the application.
 * @param mode the SSR Mode to use.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

export const loadBuildConfigurationOptions = (tsconfigOptions: object, root: Path = Process.Cwd()): RollupOptions[] => {
    const externals = [
        "solid-js",
        "solid-js/web",
        "solid-app-router",
        "solidusjs",
        "express"
    ];

    const globals = {
        'solid-js': 'solid',
        'solid-js/web': 'web',
        'solid-app-router': 'router',
        '@swindle/color': 'color',
        '@swindle/core': 'core',
        'express': 'express',
        'solidusjs': 'solidusjs'
    }

    const serverConfig = <RollupOptions> {
        input: Path.FromSegments(root, "src/server.ts").toString(),
        output: [
            {
                file: Path.FromSegments(root, 'dist/index.js').toString(),
                format: 'es',
                globals: globals
            }
        ],
        external: externals,
        plugins: [
            commonjs({
                include: 'node_modules/**',
            }),
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
                exclude: "node_modules/**",
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            json(),
            styles(),
            image(),
            copy({
                targets: [
                    //{ src: 'src/assets/**/*', dest: 'dist/src/assets' }
                    { src: Path.FromSegments(root, 'src', 'assets', "**", "*").toString().concat(`${Path.Delimiter()}**${Path.Delimiter()}*`), dest: Path.FromSegments(root, 'dist', 'src', 'assets').toString()}
                ]
            }),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    const clientConfig = <RollupOptions> {
        input: Path.FromSegments(root, "src/client.ts").toString(),
        output: [
            {
                file: Path.FromSegments(root, 'dist/public/js/index.js').toString(),
                format: 'es',
                globals: globals
            }
        ],
        external: externals,
        plugins: [
            commonjs({
                include: 'node_modules/**',
            }),
            typescript(tsconfigOptions),
            nodeResolve({
                preferBuiltins: true,
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }),
            nodePolyfill(),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "dom", hydratable: true }]],
                exclude: "node_modules/**",
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            json(),
            styles(),
            image(),
            copy({
                targets: [
                    //{ src: 'src/assets/**/*', dest: 'dist/src/assets' }
                    { src: Path.FromSegments(root, 'src', 'assets', "**", "*").toString().concat(`${Path.Delimiter()}**${Path.Delimiter()}*`), dest: Path.FromSegments(root, 'dist', 'src', 'assets').toString()}
                ]
            }),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    return [clientConfig, serverConfig];
}

