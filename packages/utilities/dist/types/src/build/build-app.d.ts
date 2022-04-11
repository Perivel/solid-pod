/**
 * build-app.ts
 *
 * This file contains functionalities necessary for building a standard SolidusJS app.
 */
import { VoidAsyncFn } from '@swindle/core';
import { Path } from '@swindle/filesystem';
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
 * buildApp()
 *
 * Builds the SolidusJS application
 * @param options The build options
 * @throws SolidusBuildException when the build fails.
 */
export declare const buildApp: (options?: BuildOptions) => Promise<void>;
