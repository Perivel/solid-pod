/**
 * CORS Options
 *
 * Specifies the CORS options.
 */
export interface CORSOptions {
    /**
     * enable
     *
     * Determines whether or not to enable CORS.
     */
    enable: boolean;
    /**
     * origin
     *
     * an array of valid origins. Each origin can be a string or a regular expression.
     */
    origin: Array<string | RegExp>;
    /**
     * methods
     *
     * Configures the Access-Control-Allow-Methods CORS header.
     */
    methods: Array<"GET" | "POST" | "HEAD" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH">;
    /**
     * allowedHeaders
     *
     * Configures the Access-Control-Allow-Headers CORS header
     */
    allowedHeaders: string[];
    /**
     * exposedHeaders
     *
     * Configures the Access-Control-Expose-Headers CORS header.
     */
    exposedHeaders: string[];
    /**
     * credentials
     *
     * Configures the Access-Control-Allow-Credentials CORS header.
     */
    credentials: boolean;
    /**
     * maxAge
     *
     * Configures the Access-Control-Max-Age CORS header.
     */
    maxAge: number;
    /**
     * preflightContinue
     *
     * Pass the CORS preflight response to the next handler
     */
    preflightContinue: boolean;
    /**
     * optionsSuccessStatus
     *
     * Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204
     */
    optionsSuccessStatus: number;
}
//# sourceMappingURL=cors-options.interface.d.ts.map