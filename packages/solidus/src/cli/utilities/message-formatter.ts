import { StringFormatter } from '@swindle/core';
import { RollupError } from 'rollup';

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

    public buildError(error: RollupError): string {
        return `Error: ${error.message}\n\n${error.frame}\n\nin ${error.loc?.file} at line ${error.loc?.line}`;
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