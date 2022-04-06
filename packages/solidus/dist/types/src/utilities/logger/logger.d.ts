import { LoggerInterface } from './logger.interface';
export declare class Logger implements LoggerInterface {
    constructor();
    /**
     * info()
     *
     * logs an info message.
     * @param message the message to log.
     */
    info(message: string): void;
    /**
     * error()
     *
     * logs an error.
     * @param message the message to post.
     */
    error(message: string): void;
    /**
     * warn()
     *
     * logs a warning.
     * @param message the message to log.
     */
    warn(message: string): void;
    private formatMessage;
}
