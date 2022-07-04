/**
 * build-app.ts
 * 
 * build-app.ts provides utility functions for building Solidus Applications.
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
    watch,
    RollupWatchOptions,
    RollupOptions,
    RollupBuild,
    RollupError} from 'rollup';
import { copy } from 'fs-extra';
import { SolidusBuildException } from './../exceptions/solidus-build.exception';
import nodeResolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from 'rollup-plugin-typescript2';
import styles from 'rollup-plugin-styles';
import nodePolyfill from 'rollup-plugin-polyfill-node';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';

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
    onBeforeRollup: async () => { },
    onRollup: async () => { },
    onBeforeGenerate: async () => { },
    onGenerate: async () => { }
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
        throw new SolidusBuildException('Cannot find package.json file.');
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

const loadBuildConfigurationOptions = (
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
        '@solidus-js/assembler',
        '@solidus-js/core',
        'solid-js/web'
    ].filter(dep => dep !== 'solid-app-router');

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
                format: 'es',
                
            }
        ],
        external: externals,
        plugins: [
            nodePolyfill(),
            nodeResolve({
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            typescript(tsPluginOptions),
            commonjs({
                include: [
                    Path.FromSegments(root, 'node_modules', '**').toString()
                ]
            }),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "ssr", hydratable: true }]],
                exclude: "node_modules/**",
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            json(),
            styles(),
            image(),
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    const clientConfig = <RollupOptions>{
        input: clientEntryFilePath.toString(),
        external: ['@solidus-js/assembler'],
        output: [
            {
                file: Path.FromSegments(outputDir, 'public/scripts/client.js').toString(),
                format: 'es',
            },
        ],
        plugins: [
            nodePolyfill(),
            nodeResolve({
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            typescript(tsPluginOptions),
            commonjs({
                include: [
                    Path.FromSegments(root, 'node_modules', '**').toString()
                ]
            }),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "dom", hydratable: true }]],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            json(),
            styles(),
            image(),
        ],
        preserveEntrySignatures: false,
        treeshake: false,
    };

    return [clientConfig, serverConfig];
}

/**
 * loadWatchConfigurationOptions()
 * 
 * loads the configuration options for watching the application.
 * @param deps the project dependencies.
 * @param devDeps the development dependencies.
 * @param root The project root directory.
 * @returns A RollupOptions instance with the appropriate config settigs.
 */

const loadWatchConfigurationOptions = (
    deps: string[],
    devDeps: string[],
    root: Path,
    outputDir: Path,
    serverEntryFilePath: Path,
    clientEntryFilePath: Path,
    assetsFilePath: Path,
): RollupWatchOptions[] => {
    const externals = [
        ...deps,
        '@solidus-js/assembler',
        '@solidus-js/core',
        '@solidus-js/dev-server',
        'solid-js/web'
    ].filter(dep => dep !== 'solid-app-router');

    const tsConfigOverrides = {
        declaration: true,
        declarationDir: Path.FromSegments(outputDir, 'types').toString(),
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
                format: 'es',
                //globals: globals,
            }
        ],
        external: externals,
        plugins: [
            nodePolyfill(),
            nodeResolve({
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
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
        ],
        preserveEntrySignatures: false,
        treeshake: true,
    };

    const clientConfig = <RollupOptions>{
        input: clientEntryFilePath.toString(),
        output: [
            {
                file: Path.FromSegments(outputDir, 'public/scripts/client.js').toString(),
                format: 'es',
            },
        ],
        plugins: [
            nodePolyfill(),
            nodeResolve({
                exportConditions: ["solid"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            typescript(tsPluginOptions),
            commonjs(),
            babel({
                babelHelpers: "bundled",
                presets: [["solid", { generate: "dom", hydratable: true }]],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            json(),
            styles(),
            image(),
        ],
        preserveEntrySignatures: false,
        treeshake: false,
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
        // manually copy asset files
        await copy(buildOptions.assetsDir!.toString(), Path.FromSegments(buildOptions.root!.toString(), 'dist/public').toString(), {
            overwrite: true,
            preserveTimestamps: true
        });
        await buildOptions.onGenerate!();
    }
    catch (e) {
        // failed to build the bundle.
        // perform some necessary operations.
        let error: FileSystemException | RollupError;
        if (e instanceof FileSystemException) {
            error = e as FileSystemException;
        }
        else {
            error = e as RollupError;
        }
        throw new SolidusBuildException(error.message);
    }
};

/**
 * watchApp()
 * 
 * watchApp() builds the app, and watches the source for changes.
 * @param options the buikd options.
 * @param onBuildStart a function to be executed when a new build has started.
 * @param onBuildComplete a function to execute when the build completes.
 * @param onBuildError a function to execute when an error occurs during the build.
 * @returns a function to stop the watcher.
 */

export const watchApp = async (
    options: BuildOptions = {},
    onBuildStart = () => { },
    onBuildComplete = () => { },
    onBuildError = () => { },
    onRestart = () => { }
): Promise<VoidAsyncFn> => {
    const buildOptions = resolveBuildOptions(options);
    const deps = await loadDependenciesList();
    const watchOptions = loadWatchConfigurationOptions(
        deps.deps,
        deps.dev,
        buildOptions.root!,
        buildOptions.outputDir!,
        buildOptions.serverEntryPoint!,
        buildOptions.clientEntryPoint!,
        buildOptions.assetsDir!
    );

    const watcher = watch(watchOptions);
    watcher.on('event', event => {
        if (event.code === "START") {
            // a new build has started.
            onBuildStart();
        }
        else if (event.code === "END") {
            // A new build has been completed.
            onBuildComplete();
        }
        else if (event.code === "ERROR") {
            // there is a build error that occured.
            onBuildError();
        }
    })
    return watcher.close;
};