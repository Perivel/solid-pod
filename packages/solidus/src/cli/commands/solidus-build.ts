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

import { rollup, RollupBuild, RollupOptions, RollupError } from "rollup";
import { Process } from '@swindle/os';
import { FileSystem, FileSystemException, Path } from '@swindle/filesystem';
import { loadBuildConfigurationOptions } from "../utilities/rollup-templates";
import { CommandStatus } from "../utilities/command-status.enum";
import container from './../utilities/container';
import { loadTsconfig } from './../utilities/load-tsconfig';
import { MessageFormatter } from "../utilities/message-formatter";
import { SolidusException } from "../exceptions/solidus.exception";
import { loadDependenciesList } from "../utilities/load-dependencies-list";

/**
 * runBuild()
 * 
 * Builds the application.
 */

export const runBuild = async (): Promise<CommandStatus> => {
    const fmt = container.get(MessageFormatter);
    const bundlePath = Path.FromSegments(Process.Cwd(), 'dist');

    // load the rollup configuration file.
    console.log(fmt.message(`Loading rollup template...`));
    const tsconfig = await loadTsconfig(Process.Cwd());
    const deps = await loadDependenciesList(Process.Cwd());
    const rollupOptions = loadBuildConfigurationOptions(tsconfig.compilerOptions, deps.deps, deps.dev, Process.Cwd());

    // create the bundle

    try {
        console.log(fmt.message('Creating bundle...'));
        const builds = await Promise.all(rollupOptions.map(async option => {
            return await rollup(option);
        }));

        // delete the old bundle if it exists.
        if (await FileSystem.Contains(bundlePath)) {
            console.log(fmt.message('Deleting previous build...'));
            await FileSystem.Delete(bundlePath, true, true);
            console.log(fmt.message('Successfully deleted previous build.'));
        }
        
        console.log(fmt.message('Generating Bundle...'));
        const len = builds.length;
        for (let i = 0; i < len; i++) {
            await generateBundle(builds[i], rollupOptions[i]);
        }

    }
    catch (e) {
        // failed to build the bundle.
        const error = e instanceof FileSystemException ? new SolidusException((e as FileSystemException).message) : e as RollupError;
        console.log(fmt.buildError(error));
        return CommandStatus.Error;
    }

    return CommandStatus.Success;
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