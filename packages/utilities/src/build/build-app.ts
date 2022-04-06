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

/**
 * build-app.ts
 * 
 * This file contains functionalities necessary for building a standard SolidusJS app.
 */


import { VoidAsyncFn } from '@swindle/core';
import { Process } from '@swindle/os';
import { 
    FileSystem,
    FileSystemException,
    Path, 
    FileOpenFlag 
} from '@swindle/filesystem';
import {
    rollup, 
    RollupOptions, 
    RollupBuild,
    RollupError,
} from 'rollup';
import { 
    SolidusException,
    SolidusBuildException,
} from './../exceptions/index';
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
import container from './../container';

/**
 * BuildOptions
 * 
 * Build options.
 */

export interface BuildOptions {
    // the Solidus project root.
    root?: Path,

    // the Directory path where to place the output.
    outputDir?: Path,

    // the server entry point file path
    serverEntryPoint?: Path,

    // the client entry point file path
    clientEntryPoint?: Path,

    // The path to the assets directory.
    assetsDir?: Path,

    // executed before the bundle is generated.
    onBeforeRollup?: VoidAsyncFn,

    // generated after the rollup bundle has been created.
    onRollup?: VoidAsyncFn,

    // executed before the bundle is generated.
    onBeforeGenerate?: VoidAsyncFn,

    // executed after the bundle has been successfully generated.
    onGenerate?: VoidAsyncFn,
};

const defaultBuildOptions: BuildOptions = {
    root: Process.Cwd(),
    outputDir: Path.FromSegments(Process.Cwd(), 'dist'),
    clientEntryPoint: Path.FromSegments(Process.Cwd(), 'src/client.ts'),
    serverEntryPoint: Path.FromSegments(Process.Cwd(), 'src/server.ts'),
    assetsDir: Path.FromSegments(Process.Cwd(), 'src/assets/**/**'),
    onBeforeRollup: async () => {},
    onRollup: async () => {},
    onBeforeGenerate: async () => {},
    onGenerate: async () => {}
}

/**
 * resolveBuildOptions()
 * 
 * resolves the build options.
 * @param options the build options.
 */

const resolveBuildOptions = (options: BuildOptions): BuildOptions => {
    return {
        root: options.root || defaultBuildOptions.root,
        outputDir: options.outputDir || defaultBuildOptions.outputDir,
        clientEntryPoint: options.clientEntryPoint || defaultBuildOptions.clientEntryPoint,
        serverEntryPoint: options.serverEntryPoint || defaultBuildOptions.serverEntryPoint,
        assetsDir: options.assetsDir || defaultBuildOptions.assetsDir,
        onBeforeRollup: options.onBeforeRollup || defaultBuildOptions.onBeforeRollup,
        onRollup: options.onRollup || defaultBuildOptions.onRollup,
        onBeforeGenerate: options.onBeforeGenerate || defaultBuildOptions.onBeforeGenerate,
        onGenerate: options.onGenerate || defaultBuildOptions.onGenerate
    };
}

/**
 * The default tsconfig object.
 */

const defaultConfig: any = {
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
}

/**
 * loadTsconfig()
 * 
 * loads the tsconfig file.
 * @param root the project root directory.
 * @returns Tsconfig options.
 */

const loadTsconfig = async (root: Path = Process.Cwd()): Promise<any> => {
    const path = Path.FromSegments(root, 'tsconfig.json');
    let config = defaultConfig;

    if (await FileSystem.Contains(path)) {
        const file = await FileSystem.Open(path, FileOpenFlag.READ);
        const data = await file.readAll();
        await file.close();
        config = JSON.parse(data);
    }

    return config;
}

/**
 * An interface for the package dependencies.
 */

interface PackageDependenciesInterface {
    dependencies: object,
    devDependencies: object
}

/**
 * loadDependenciesList()
 * 
 * loads the dependencies list
 * @param root the project root directory.
 * @returns Tsconfig options.
 * @throws SolidusException when the package.json file cannot be found.
 */

const loadDependenciesList = async (root: Path = Process.Cwd()): Promise<{ deps: string[], dev: string[] }> => {
    const path = Path.FromSegments(root, 'package.json');
    let depsList = { deps: [] as string[], dev: [] as string[] };

    if (await FileSystem.Contains(path)) {
        const file = await FileSystem.Open(path, FileOpenFlag.READ);
        const data = await file.readAll();
        await file.close();
        const pkg: PackageDependenciesInterface = JSON.parse(data);
        depsList.deps = Object.keys(pkg.dependencies);
        depsList.dev = Object.keys(pkg.devDependencies);
    }
    else {
        throw new SolidusException('Cannot find package.json file.');
    }
    return depsList;
}

/**
 * loadBuildConfigurationOptions()
 * 
 * loads the configuration options for building the application.
 * @param deps the project dependencies.
 * @param devDeps the development dependencies.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

export const loadBuildConfigurationOptions = (
    tsconfigOptions: object, 
    deps: string[], 
    devDeps: string[], 
    root: Path,
    outputDir: Path,
    serverEntryFilePath: Path,
    clientEntryFilePath: Path,
    assetsFilePath: Path,
): RollupOptions[] => {
    const externals = [
        ...deps, 
        ...devDeps,
        '@solidusjs/core',
        '@solidusjs/client',
        '@solidusjs/server',
        '@solidusjs/utilities'
    ];
    const fmt = container.get(StringFormatter);

    const globals = {};
    deps.forEach(dep => {
        Object.defineProperty(globals, dep, {
            value: fmt.camelCase(dep)
        })
    });

    const tsConfigOverrides = {
        declaration: true,
        declarationDir: Path.FromSegments(outputDir, 'types').toString()
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


    const serverConfig = <RollupOptions>{
        input: serverEntryFilePath.toString(),
        output: [
            {
                file: Path.FromSegments(outputDir, 'index.js').toString(),
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
                    { src: assetsFilePath.toString(), dest: 'dist/public' }
                ]
            }),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    const clientConfig = <RollupOptions>{
        input: clientEntryFilePath.toString(),
        output: [
            {
                file: Path.FromSegments(outputDir, 'public/js/index.js').toString(),
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
                    { src: assetsFilePath.toString(), dest: 'dist/public' }
                ]
            }),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    return [clientConfig, serverConfig];
}

/**
* generateBundle()
* 
* generates the Rollup bunlde.
* @param bundle the bundle to build.
*/

const generateBundle = async (bundle: RollupBuild, options: RollupOptions): Promise<void> => {
    // build the output.
    if (options.output) {
        if (Array.isArray(options.output)) {
            await Promise.all(options.output.map(async option => {
                return await bundle.write(option);
            }));
        }
        else {
            await bundle.write(options.output);
        }
    }
}

/**
 * buildApp()
 * 
 * Builds the SolidusJS application
 * @param options The build options
 * @throws SolidusBuildException when the build fails.
 */

export const buildApp = async (options: BuildOptions = {}): Promise<void> => {
    const buildOptions = resolveBuildOptions(options);
    const tsconfig = await loadTsconfig(buildOptions.root);
    const deps = await loadDependenciesList();
    const rollupOptions = loadBuildConfigurationOptions(
        tsconfig, 
        deps.deps, 
        deps.dev, 
        buildOptions.root!, 
        buildOptions.outputDir!, 
        buildOptions.serverEntryPoint!, 
        buildOptions.clientEntryPoint!,
        buildOptions.assetsDir!
    );

    try {
        await buildOptions.onBeforeRollup!();
        const builds = await Promise.all(rollupOptions.map(async option => {
            return await rollup(option);
        }));
        await buildOptions.onRollup!();

        // delete the old bundle if it exists.
        if (await FileSystem.Contains(buildOptions.outputDir!)) {
            await FileSystem.Delete(buildOptions.outputDir!, true, true);
        }

        await buildOptions.onBeforeGenerate!();
        const len = builds.length;
        for (let i = 0; i < len; i++) {
            await generateBundle(builds[i], rollupOptions[i]);
        }
        await buildOptions.onGenerate!();
    }
    catch (e) {
        // failed to build the bundle.
        // perform some necessary operations.
        let error: FileSystemException|RollupError;
        if (e instanceof FileSystemException) {
            error = e as FileSystemException;
        }
        else {
            error = e as RollupError;
        }
        throw new SolidusBuildException(error.message);
    }
};