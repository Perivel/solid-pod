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
import { Configuration } from 'solidus';
import { ConfigurationNotFoundException } from './../exceptions/configuration-not-found.exception';

/**
 * loadSolidusConfiguration()
 * 
 * attempts to load the Solidus configuration file.
 * @param root the root directory of the solidus application.
 * @throws ConfigurationNotFoundException when the configuration file is not found.
 */

export const loadSolidusConfiguration = async (root: Path = Process.Cwd()): Promise<Configuration> => {
    const path = Path.FromSegments(root, 'solidus.config.ts');
    let config: Configuration|null = null;

    if (await FileSystem.Contains(path)) {
        // load the file contents.
        const configFile = await FileSystem.Open(path);
        const configData = await configFile.readAll();
        await configFile.close();
        config = JSON.parse(configData) as Configuration;
    }
    else {
        // Solidus Config file is missing.
        throw new ConfigurationNotFoundException();
    }

    return config;
}