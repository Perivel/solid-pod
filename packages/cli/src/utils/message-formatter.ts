import { StringFormatter } from '@swindle/core';
import Chalk from 'chalk';

/**
 * MessageFormatter
 * 
 * A formatter class for console messages.
*/

export class MessageFormatter extends StringFormatter {

    constructor() {
        super();
    }

    /**
     * error()
     * 
     * formats a message as an error.
     * @param message the message to format.
     * @returns an error-formatted message.
     */

    public error(message: string): string {
        return Chalk.red(`Error: ${message}`);
    }

    /**
     * info()
     * 
     * formats an information message.
     * @param message the message to format.
     * @returns the formatted message.
     */

    public info(message: string): string {
        return Chalk.green(message);
    }
}