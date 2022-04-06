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

import { DateTime } from '@swindle/core';
import chalk from 'chalk';
import { LoggerInterface } from './logger.interface';

export class Logger implements LoggerInterface {

    constructor() {
        //
    }

    /**
     * info()
     * 
     * logs an info message.
     * @param message the message to log.
     */

    public info(message: string): void {
        const msg = this.formatMessage(message);
        console.log(chalk.green(msg));
    }

    /**
     * error()
     * 
     * logs an error.
     * @param message the message to post.
     */

    public error(message: string): void {
        const msg = this.formatMessage(message);
        console.log(chalk.red(msg));
    }

    /**
     * warn()
     * 
     * logs a warning.
     * @param message the message to log.
     */

    public warn(message: string): void {
        const msg = this.formatMessage(message);
        console.log(chalk.yellow(msg));
    }

    private formatMessage(message: string): string {
        const now = DateTime.Now();
        return `[${now.year()}-${now.month()}-${now.day()}] ${message.trim()}`;
    }
}