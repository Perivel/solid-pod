/**
 * server/http-server.ts
 * 
 * server/http-server.ts defines the HttpServer.
 */

import { join } from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import Cors from '@fastify/cors';
import Static from '@fastify/static';
import Middie from 'middie';
import { Component } from 'solid-js';
import {
    renderToStringAsync,
    renderToStream,
    renderToString,
    generateHydrationScript,
} from 'solid-js/web';
import { renderTags } from 'solid-meta';
import { HttpServerInterface } from './http-server.interface';
import {
    Configuration,
    CorsOptions,
    Middleware
} from './../types';
import {
    Capsule,
    TagDescription
} from './../components';
import { resolveConfig } from './../utilities';

/**
 * HttpServer
 * 
 * The Solidus HttpServer.
 */
export class HttpServer implements HttpServerInterface {

    private readonly _rootComponent: Component;
    private readonly _server: FastifyInstance;
    private readonly _middleware: Middleware[];
    private readonly _config: Configuration;
    private readonly _corsOptions?: CorsOptions

    constructor(
        root: Component,
        config: Configuration,
        middleware: Middleware[] = [],
        cors: CorsOptions|undefined = undefined
    ) {
        this._rootComponent = root;
        this._middleware = middleware;
        this._config = resolveConfig(config);
        this._corsOptions = cors;
        this._server = Fastify({
            logger: true,
        });
        this._setupServer();
    }

    /**
     * _configureResponse()
     * 
     * configures the response.
     * @param page the stringified page content.
     * @param tags The tags to render.
     * @returns the configured page response.
     */

    private _configureResponse(page: string, tags: TagDescription[]): string {
        return `
        <!DOCTYPE html>
        <html lang="${this._config.lang!}">
          <head>
          <link rel="stylesheet" href="index.css" />
          <meta charset="${this._config.charset!}" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="shortcut icon"
            type="image/ico"
            href="favicon.ico"
          />
           ${generateHydrationScript()}
           ${renderTags(tags)}
          </head>
          <body>
            <noscript>JavaScript is required to run this app.</noscript>
            <div id="root">${page}</div>
            <script type="module" src="scripts/client.js" async></script>
          </body>
        </html>
        `;
    }

    /**
     * _configureRootComponent()
     * 
     * configures the root component.
     * @param root the root component.
     * @param url the initial server URL.
     * @param ip the initial request IP address.
     * @param tags the tags array.
     * @returns The configured Root component.
     */

    private _configureRootComponent(root: Component, url: string, ip: string, tags: TagDescription[]): Component<{}> {
        const AppRoot = this._rootComponent;
        return () => {
            return <Capsule
                env={this._config.env!}
                tags={tags}
                url={url}
                ip={ip}
            >
                <AppRoot />
            </Capsule>
        }
    }

    /**
     * _setupServer()
     * 
     * _setupServer() sets up the HttpServer.
     */

    private _setupServer(): void {
        // register middleware if it is defined
        if (this._middleware.length > 0) {
             // register middleware.
            this._server.register(Middie, {
                hook: 'preHandler',
            });
            this._middleware.forEach(middleware => this._server.use(middleware));
        }

        // set up cors if it is enabled.
        if (this._corsOptions) {
            this._server.register(Cors, {
                // cors settings.
                allowedHeaders: this._corsOptions?.allowHeaders,
                credentials: this._corsOptions.credentials,
                exposedHeaders: this._corsOptions.exposeHeaders,
                hideOptionsRoute: this._corsOptions.hideOptionsRoute,
                maxAge: this._corsOptions.maxAge,
                methods: this._corsOptions.methods,
                optionsSuccessStatus: this._corsOptions.optionsSuccessStatus,
                origin: this._corsOptions.origin,
                preflight: this._corsOptions.preflight,
                preflightContinue: this._corsOptions.preflightContinue,
                strictPreflight: this._corsOptions.strictPreflight
            });
        }

        // register public path.
        this._server.register(Static, {
            root: join(process.cwd(), '/dist/public'),
        });

        // register the error handler
        this._server.setErrorHandler((error, req, res) => {
            this._server.log.error(error.message);
            res.status(500).send('Server Error');
        });

        // register the main route.
        this._server.get('*', async (req, res) => {
            const tags: TagDescription[] = []
            const App = this._configureRootComponent(this._rootComponent, req.url, req.ip, tags);

            if (this._config.ssr! === 'stream') {
                renderToStream(() => <App />).pipe(res.raw);
            }
            else {
                let page: string;

                try {
                    if (this._config.ssr! === 'async') {
                        page = await renderToStringAsync(() => <App />);
                    }
                    else {
                        page = renderToString(() => <App />);
                    }
                    res
                        .status(200)
                        .header('Content-Type', 'text/html')
                        .send(this._configureResponse(page, tags));
                }
                catch (e) {
                    this._server.log.error((e as Error).message);
                    res.status(500).send("Server Error");
                }
            }
        });
    }

    /**
     * start()
     * 
     * start() starts the HttpServer.
     */

    public start(): void {
        this._server.listen(this._config.port!, (error, address) => {
            if (error) {
                throw error;
            }
            this._server.log.info(`Application successfully running on ${address}`);
        });
    }
}