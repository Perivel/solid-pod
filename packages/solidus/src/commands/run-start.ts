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

import { Process } from '@swindle/os';
import { Path, FileSystem } from '@swindle/filesystem';
import { exec } from 'child_process';
import {
    CommandType,
    CommandStatus,
    DIContainer,
    Logger,
} from './../utilities/index';
import { runBuild } from './run-build';
import { SolidusException } from '@solidusjs/utilities';

/**
 * runStart()
 * 
 * starts the application.
 * @returns CommandStatus that represents the command status.
 */

export const runStart: CommandType = async () => {
    const logger = DIContainer.get(Logger);
    const root = Process.Cwd();
    const serverEntry = Path.FromSegments(root, 'dist/index.js');

    if (!await FileSystem.Contains(serverEntry)) {
        // The application has not yet been built.
        // Build the application.
        logger.info('Building your application...')
        const buildStatus = await runBuild();

        if (buildStatus === CommandStatus.Error) {
            return buildStatus;
        }
        logger.info('Successfully built application.');
    }

    // run the application in production mode.
    try {
        logger.info('Starting Application...');
        // const outputStream = await Process.Exec(`node ${serverEntry.toString()}`, {
        //     cwd: root.toString(),
        // });
        exec(`node ${serverEntry.toString()}`, (err, stdout, stderr) => {
            if (err) {
                throw new Error(err.message);
            }

            if (stdout) {
                console.log("\n" + stdout + '\n');
            }

            if (stderr) {
                console.log(`\n${stderr}\n`);
            }
        })
    }
    catch(e) {
        const error = e as Error;
        logger.error(error.message);
        return CommandStatus.Error;
    }
    
    return CommandStatus.Success;
}