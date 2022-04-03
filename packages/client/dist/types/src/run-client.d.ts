import { Application, Configuration } from '@solidusjs/core';
/**
 * runClient()
 *
 * Renders the application on the client.
 * @note This function only works on the client side.
 * @param App The application to render.
 * @param config The configuration object.
 */
export declare const runClient: (App: Application, config: Configuration) => () => void;
