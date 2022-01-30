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

import { rollup, RollupBuild, RollupOptions } from "rollup";
import { Process } from '@swindle/os';
import { loadConfigurationOptions } from "../utilities/rollup-templates";
import { loadSolidusConfiguration } from "../utilities/load-solidus-config";
import { SSRMode } from "../../server/index";
import { CommandStatus } from "../utilities/command-status.enum";

/**
 * runBuild()
 * 
 * Builds the application.
 */

export const runBuild = async (): Promise<number> => {
    let ssr: SSRMode | null = null;

    // load the solidus configuration.
    try {
        // load the solidus config
        const config = await loadSolidusConfiguration(Process.Cwd());
        ssr = config.ssr;
    }
    catch (e) {
        // could not find the configuration.
        return CommandStatus.Error;
    }

    // load the rollup configuration file.
    const rollupOptions = loadConfigurationOptions(ssr, Process.Cwd());

    // create the bundle

    try {
        const build = await rollup(rollupOptions);
        await generateBundle(build, rollupOptions);
    }
    catch (e) {
        // failed to build the bundle.
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
            Promise.all(options.output.map(async option => {
                return bundle.write(options);
            }));
        }
        else {
            await bundle.write(options.output);
        }
    }
}