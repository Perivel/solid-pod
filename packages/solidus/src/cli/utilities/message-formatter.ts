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
        let message = `Error: ${error.message}\n\n`;
        if (error.code === `PARSE_ERROR`) {
            message += `${error.frame}\n\nin ${error.loc?.file} at line ${error.loc?.line}`;
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