import Polka from 'polka';
import serve from 'serve-static';
import { join } from 'path';
import { Component, JSX } from 'solid-js';
import { renderToString, renderToStringAsync, renderToStream } from 'solid-js/web';
import { Configuration } from './configuration/configuration';

/**
 * runApp()
 * 
 * runs the application server.
 * @param App the application component to run.
 * @param config The server configuration.
 */

export const runApp = (App: Component, config: Configuration): void => {
    Polka()
        // attach the middleware.
        .use(...config.middleware)

        // register static assets.
        .use(`/${config.static}`, serve(join(__dirname, config.static)))

        // set up the server route.
        .get('*', async (req, res) => {
            let page: string;
            try {
                // render the application.
                if (config.ssr === 'async') {
                    // asynchonously render the application.
                    page = '';
                }
                else if (config.ssr === 'sync') {
                    // synchonously render the page.
                    page = '';
                }
                else {
                    // render the page as a stream.
                    page = '';
                }
            }
            catch (e) {
                console.log((e as Error).message);
            }
            finally {
                res.send(page);
            }
        })

        // start the server.
        .listen(config.port, () => {
            console.log(`Application running on ${config.host}:${config.port}`);
        });
}