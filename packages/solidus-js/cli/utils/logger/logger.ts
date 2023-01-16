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
        const msg = this.formatMessage(`Error: ${message}`);
        console.log(chalk.red(msg));
    }

    /**
     * log()
     * 
     * logs a regular message with no formatting.
     * @param message the message to log.
     */

    public log(message: string): void {
        console.log(chalk.green(message));
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
        return `[${DateTime.Now().toString()}]: ${message.trim()}`;
    }
}