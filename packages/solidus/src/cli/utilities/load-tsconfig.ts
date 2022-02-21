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

import { Path, FileSystem, FileOpenFlag } from '@swindle/filesystem';
import { Process } from '@swindle/os';

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

export const loadTsconfig = async (root: Path = Process.Cwd()): Promise<any> => {
    const path = Path.FromSegments(root, 'src', 'tsconfig.json');
    let config = defaultConfig;

    if (await FileSystem.Contains(path)) {
        const file = await FileSystem.Open(path, FileOpenFlag.READ);
        const data = await file.readAll();
        await file.close();
        config = JSON.parse(data);
    }

    return config;
}