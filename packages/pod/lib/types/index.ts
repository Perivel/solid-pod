/**
 * types/index.ts
 * 
 * types/index.ts contains definitions for commonly used types.
 */

import { 
    IncomingMessage,
    ServerResponse
} from 'http';
import { CharacterSet, DateTime, IsoLanguage } from '@chaperone/util';

/**
 * Env
 * 
 * Env represents the development envionment currently being run. Enc can have a value of production or development.
 */

export type Env = 'development' | 'production';

/**
 * SSRMode
 * 
 * SSRMode represents a mode of SSR (server side rendering).
 */

export type SSRMode = "sync" | "async" | "stream";

/**
 * Configuration
 * 
 * An application configuration.
 */

export interface Configuration {
    /**
   * charset
   *
   * The character set. (i.e utf-8)
   */

    charset?: CharacterSet;

    /**
     * host
     *
     * The server host
     */

    host?: string;

    /**
     * lang
     *
     * The language to use. (i.e 'en')
     */

    lang?: IsoLanguage;

    /**
     * port
     *
     * the server port to listen to.
     */

    port?: number;

    /**
     * env
     *
     * The environment the server will run on.
     */

    env?: Env;

    /**
     * ssr
     *
     * the SSR mode to use.
     */

    ssr?: SSRMode;
}

/**
 * ServerRequestContext
 * 
 * An object repreenting the initial request coming from the SolidusJS server.
 */

export interface ServerRequestContext {
    url?: string;
    ip?: string;
    date?: DateTime;
}

/**
 * middleware
 * 
 * middleware.ts defines types and interfaces for server middleware.
 */

export type Request = IncomingMessage;
export type Response = ServerResponse;

 /**
  * Middleware
  * 
  * Solidus Middleware.
  */
 
 export type Middleware = (req: Request, res: Response) => Promise<void>;

 /**
  * CorsOptions
  * 
  * Options for setting up Cors.
  */

 export interface CorsOptions {
    allowHeaders?: string[];
    credentials?: boolean;
    exposeHeaders?: string|string[];
    hideOptionsRoute?: boolean;
    maxAge?: number;
    methods?: string|string[];
    optionsSuccessStatus?: number;
    origin?: string[];
    preflight?: boolean;
    preflightContinue?: boolean;
    strictPreflight?: boolean;
}