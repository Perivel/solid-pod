/**
 * build-app.ts
 *
 * This file contains functionalities necessary for building a standard SolidusJS app.
 */
import { VoidAsyncFn } from '@swindle/core';
import { Path } from '@swindle/filesystem';
import { RollupOptions } from 'rollup';
/**
 * BuildOptions
 *
 * Build options.
 */
export interface BuildOptions {
    root?: Path;
    outputDir?: Path;
    serverEntryPoint?: Path;
    clientEntryPoint?: Path;
    assetsDir?: Path;
    onBeforeRollup?: VoidAsyncFn;
    onRollup?: VoidAsyncFn;
    onBeforeGenerate?: VoidAsyncFn;
    onGenerate?: VoidAsyncFn;
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
export declare const loadBuildConfigurationOptions: (tsconfigOptions: object, deps: string[], devDeps: string[], root: Path, outputDir: Path, serverEntryFilePath: Path, clientEntryFilePath: Path, assetsFilePath: Path) => RollupOptions[];
/**
 * buildApp()
 *
 * Builds the SolidusJS application
 * @param options The build options
 * @throws SolidusBuildException when the build fails.
 */
export declare const buildApp: (options?: BuildOptions) => Promise<void>;
