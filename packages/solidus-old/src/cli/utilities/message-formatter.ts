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

import { StringFormatter } from '@swindle/core';
import { RollupError } from 'rollup';
import { SolidusException } from '../exceptions/solidus.exception';

/**
 * MessageFormatter
 * 
 * A message formatting utility for CLI outputs.
 */
export class MessageFormatter extends StringFormatter {

    constructor() {
        super();
    }

    /**
     * buildError()
     * 
     * formats a rollup build error.
     * @param error The rollup error to generate a message for.
     * @returns the formatted error message.
     */

    public buildError(error: RollupError|SolidusException): string {
        let message = '';
        if (error instanceof SolidusException) {
            // solus
            message = `Error: ${error.message}\n\n`;
        }
        else {
            // it is a Rollup error.
            message = `Error: ${error.message}\n\n`;
            if (error.code === `PARSE_ERROR`) {
                message += `${error.frame}\n\nin ${error.loc?.file} at line ${error.loc?.line}`;
            }
        }
        return message;
    }

    /**
     * message()
     * 
     * formats a regular console message.
     * @param msg the message to format.
     * @returns the formatted message.
     */

    public message(msg: string): string {
        return msg.trim();
    }
}