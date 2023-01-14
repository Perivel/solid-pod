/**
 * types/index.ts
 * 
 * types/index.ts contains definitions for commonly used types.
 */

import { 
    IncomingMessage,
    ServerResponse
} from 'http';
import { IncomingMessageExtended } from 'middie';

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
 * ISOLanguageCode
 * 
 * An ISO Language code.
 */

export type ISOLanguageCode =
    'ab' | 'add' | 'af' | 'ak' | 'sq' | 'am' | 'ar' | 'an' | 'hy' | 'as' | 'av' | 'ae' | 'ay' | 'az' | 'bm' | 'ba' | 'eu' | 'be' | 'bn' | 'bh' | 'bl' | 'bs' | 'br' | 'bg' |
    'my' | 'ca' | 'ch' | 'ce' | 'ny' | 'zh' | 'zh-Hans' | 'zh-Hant' | 'cv' | 'kw' | 'co' | 'cr' | 'hr' | 'cs' | 'da' | 'dv' | 'nl' | 'dz' | 'en' | 'eo' | 'et' | 'ee' | 'fo' |
    'fj' | 'fi' | 'fr' | 'ff' | 'gl' | 'gd' | 'gv' | 'ka' | 'de' | 'el' | '	kl' | '	gn' | 'gu' | '	ht' | '	ha' | '	he' | '	hz' | '	hi' | '	ho' | '	hu' | '	is' | '	io' | '	ig' |
    'id' | 'in' | '	ia' | '	ie' | '	iu' | '	ik' | '	ga' | '	it' | 'ja' | '	jv' | 'kl' | 'kn' | 'kr' | 'ks' | 'kk' | 'km' | 'ki' | 'rw' | 'rn' | 'ky' | 'kv' | 'kg' | 'ko' | 'ku' |
    'kj' | 'lo' | 'la' | 'lv' | 'li' | 'ln' | 'lt' | 'lu' | 'lg' | 'lb' | 'gv' | 'mk' | 'mg' | 'ms' | 'ml' | 'mt' | 'mi' | 'mr' | 'mh' | 'mo' | 'mn' | 'na' | 'nv' | 'ng' | 'nd' |
    'ne' | 'no' | 'nb' | 'nn' | 'ii' | 'oc' | 'oj' | 'cu' | 'or' | 'om' | 'os' | 'pi' | 'ps' | 'fa' | 'pl' | 'pt' | 'pa' | 'qu' | 'rm' | 'ro' | 'ru' | 'se' | 'sm' | 'sg' | 'sa' |
    'sr' | 'sh' | 'st' | 'tn' | 'sn' | 'ii' | 'sd' | 'si' | 'ss' | 'sk' | 'sl' | 'so' | 'nr' | 'es' | 'su' | 'sw' | 'ss' | 'sv' | 'tl' | 'ty' | 'tg' | 'ta' | 'tt' | 'te' | 'th' |
    'bo' | 'ti' | 'to' | 'ts' | 'tr' | 'tk' | 'tw' | 'ug' | 'uk' | 'ur' | 'uz' | 've' | 'vi' | 'vo' | 'wa' | 'cy' | 'wo' | 'fy' | 'xh' | 'yi' | 'ji' | 'yo' | 'za' | 'zu'
    ;

/**
 * CharacterSet
 * 
 * A valid character set.
 */

export type CharacterSet = 'ASCII' | 'ANSI' | '8859' | 'UTF-8';

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

    lang?: ISOLanguageCode;

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
}

/**
 * middleware.ts
 * 
 * middleware.ts defines types and interfaces for server middleware.
 */

export type Request = IncomingMessage & IncomingMessageExtended;
export type Response = ServerResponse;
export type NextFn = (err?: any) => void;

 /**
  * Middleware
  * 
  * Solidus Middleware.
  */
 
 export type Middleware = (req: Request, res: Response, next: NextFn) => Promise<void>;

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