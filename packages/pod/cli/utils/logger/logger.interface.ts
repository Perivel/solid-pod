/**
 * LoggerInterface
 * 
 * A logger interface.
 */

export interface LoggerInterface {

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
     * log()
     * 
     * logs a regular message with no formatting.
     * @param message the message to log.
     */

    log(message: string): void;

    /**
     * warn()
     * 
     * logs a warning.
     * @param message the message to log.
     */

    warn(message: string): void;
}