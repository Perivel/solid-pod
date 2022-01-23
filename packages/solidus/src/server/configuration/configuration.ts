import { Middleware } from './../middleware/middleware';

/**
 * ENV
 * 
 * ENV values
*/

export type ENV = 'development' | 'production';

/**
 * SSRMode
 * 
 * The SSR mode to use.
 */

export type SSRMode = 'sync' | 'stream' | 'async';

/**
 * Configuration
 * 
 * The Server Configuration.
 */

export interface Configuration {
    /**
     * host
     * 
     * The server host
     */

    host: string;

    /**
     * port
     * 
     * the server port to listen to.
     */

    port: number;

    /**
     * env
     * 
     * The environment the server will run on.
     */

    env: ENV;

    /**
     * ssr
     * 
     * the SSR mode to use.
     */

    ssr: SSRMode;

    /**
     * middleware
     * 
     * the middleware to attach.
     */

    middleware: Middleware[];

    /**
     * static
     * 
     * path from the root directory to the static assets directory.
     */
    
    static: string
}