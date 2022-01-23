import Polka from 'polka';
import serve from 'serve-static';
import { join } from 'path';
import { 
    renderToString, 
    renderToStringAsync, 
    renderToStream
} from 'solid-js/web';
import { Configuration } from './configuration/configuration';
import { Application } from '../types/application.type';

/**
 * runApp()
 * 
 * runs the application server.
 * @param App the application component to run.
 * @param config The server configuration.
 */

export const runApp = (App: Application, config: Configuration): void => {
    Polka()
        // attach the middleware.
        .use(...config.middleware)

        // register static assets.
        .use(`/public`, serve(join(__dirname, config.static)))

        // set up the server to be used for SSR.
        .get('*', async (req, res) => {
            
            if (config.ssr === 'stream') {
                // set up streaming ssr.
                renderToStream(() => <App url={req.url}/>).pipe(res);
            }
            else {
                // the SSR configuration is set to either synchonous or asynchonous SSR.
                try {
                    let page: string;

                    if (config.ssr === 'async') {
                        // set up async ssr.
                        page = await renderToStringAsync(() => <App url={req.url}/>);
                    }
                    else {
                        // set up standard ssr.
                        page = renderToString(() => <App url={req.url}/>)
                    }
                    res.send(page);
                }
                catch(e) {
                    console.log((e as Error).message);
                    res.status(500).send('Server Error');
                }
            }
        })

        // start the server.
        .listen(config.port, () => {
            console.log(`Application running on ${config.host}:${config.port}`);
        });
}