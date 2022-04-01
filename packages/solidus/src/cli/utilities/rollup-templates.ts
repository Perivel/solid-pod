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
import { StringFormatter } from '@swindle/core';
import nodeResolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from 'rollup-plugin-typescript2';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import nodePolyfill from 'rollup-plugin-polyfill-node';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import container from './container';

/**
 * loadBuildConfigurationOptions()
 * 
 * loads the configuration options for building the application.
 * @param deps the project dependencies.
 * @param devDeps the development dependencies.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

export const loadBuildConfigurationOptions = (tsconfigOptions: object, deps: string[], devDeps: string[], root: Path = Process.Cwd()): RollupOptions[] => {
    const externals = [...deps, ...devDeps];
    const fmt = container.get(StringFormatter);

    const globals = {};
    deps.forEach(dep => Object.defineProperty(globals, dep, {
        value: fmt.camelCase(dep)
    }));

    const tsConfigOverrides = {
        declaration: true,
        declarationDir: Path.FromSegments(root, '/dist/types').toString()
    }

    const tsPluginOptions = {
        tsconfig: Path.FromSegments(root, 'tsconfig.json').toString(),
        check: true,
        clean: true,
        abortOnError: true,
        rollupCommonJSResolveHack: false,
        useTsconfigDeclarationDir: true,
        cwd: root.toString(),
        tsconfigOverride: tsConfigOverrides,
    };


    const serverConfig = <RollupOptions> {
        input: Path.FromSegments(root, "src/server.ts").toString(),
        output: [
            {
                file: Path.FromSegments(root, 'dist/index.js').toString(),
                format: 'esm',
                globals: globals,
            }
        ],
        external: externals,
        plugins: [
            nodePolyfill(),
            nodeResolve({
                preferBuiltins: true,
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                mainFields: ['main', 'module', 'browser', 'exports'],
                
            }),
            typescript(tsPluginOptions),
            commonjs(),
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
                    { src: Path.FromSegments(root, 'src/assets/**/*').toString(), dest: Path.FromSegments(root, 'dist/server/assets').toString()}
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
                format: 'esm',
                globals: globals,
            },
        ],
        external: externals,
        plugins: [
            typescript(tsPluginOptions),
            nodeResolve({
                preferBuiltins: true,
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }),
            nodePolyfill(),
            commonjs({
                include: 'node_modules/**',
            }),
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
                    { src: 'src/assets/**/*', dest: 'dist/src/assets' }
                    //{ src: Path.FromSegments(root, 'src/assets/**/*').toString(), dest: Path.FromSegments(root, 'dist/client/assets').toString()}
                ]
            }),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    return [clientConfig, serverConfig];
}

