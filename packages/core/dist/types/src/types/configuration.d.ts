/**
 * ENV
 *
 * ENV values
 */
export declare type ENV = "development" | "production";
/**
 * SSRMode
 *
 * The SSR mode to use.
 */
export declare type SSRMode = "sync" | "stream" | "async";
/**
 * Configuration
 *
 * The Server Configuration.
 */
export interface Configuration {
    /**
     * charset
     *
     * The character set. (i.e utf-8)
     */
    charset: string;
    /**
     * host
     *
     * The server host
     */
    host: string;
    /**
     * lang
     *
     * The language to use. (i.e 'en')
     */
    lang: string;
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
     * style
     *
     * The root stylesheet of the application, from the public directory.
     * This must be a .css file.
     */
    style: string;
    /**
     * ssr
     *
     * the SSR mode to use.
     */
    ssr: SSRMode;
    /**
     * title
     *
     * A Default title to set.
     */
    title: string;
}
