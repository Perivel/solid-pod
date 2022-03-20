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

import { FileSystem, Path } from '@swindle/filesystem';
import { Process } from '@swindle/os';
import { SolidusException } from '../exceptions/solidus.exception';
import { CommandStatus } from "../utilities/command-status.enum";
import { MessageFormatter } from '../utilities/message-formatter';
import { runBuild } from './solidus-build';
import container from './../utilities/container';

/**
 * runStart()
 * 
 * starts the server.
 */

export const runStart = async (): Promise<CommandStatus> => {
    const executablePath = Path.FromSegments(Process.Cwd(), 'dist/server/index.js');
    const fmt = container.get(MessageFormatter);

    if (!await FileSystem.Contains(executablePath)) {
        // not yet built. Build the app
        const buildStatus = await runBuild();
        
        if (buildStatus === CommandStatus.Error) {
            return buildStatus;
        }
    }

    try {
        // start the application.
        console.log(fmt.message('Starting application...'));
        await Process.Exec(`node ${executablePath.toString()}`, {
            cwd: Process.Cwd().toString(),
        });
    }
    catch(e) {
        const error = new SolidusException((e as Error).message);
        console.log(fmt.buildError(error));
        return CommandStatus.Error;
    }

    return CommandStatus.Success;
}