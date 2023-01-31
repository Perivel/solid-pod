/**
 * entry/index.tsx
 * 
 * entry/index.tsx contains the entry point 
 */

import { VoidSyncFn, DateTime } from '@chaperone/util';
import { Component } from 'solid-js';
import { isServer, hydrate } from 'solid-js/web';
import {
    Configuration,
    CorsOptions,
    Middleware
} from './../types';
import { resolveConfig } from './../utilities';
import { useServer } from './../primitives';
import { Capsule } from './../components';
import { HttpServer } from './../server/http-server';

/**
 * ServerOptions
 * 
 * Server configuration options.
 */

export interface ServerOptions {
    config?: Configuration;
    middleware?: Middleware[];
    cors?: CorsOptions;
}

/**
 * runClient()
 * 
 * Renders the application on the client.
 * @note This function only works on the client side.
 * @param App The application to render.
 * @param config The configuration object.
 */

const runClient = (App: Component, config: Configuration = {}): VoidSyncFn => {
    const appConfig = resolveConfig(config);
    const server = useServer();
    const ClientComponent = () => <Capsule url={server()?.url} tags={[]} env={appConfig.env!} date={DateTime.Now()}>
        <App />
    </Capsule>;

    return hydrate(() => <ClientComponent />, document.getElementById('root') as HTMLElement);
}

/**
 * runServer()
 *
 * runs the application server.
 * @note THis function is intended to only run on the server.
 * @param App the application component to run.
 * @param config The server configuration.
 * @param middleware An array of Middleware to register.
 */

const runServer = (
    App: Component,
    config: Configuration = {},
    cors: CorsOptions = {},
    middleware: Middleware[] = []
): void => {
    const server = new HttpServer(
        App,
        config,
        middleware,
        cors,
    );
    server.start();
};

/**
 * runApp()
 * 
 * runs the application.
 * @param App The root component to run.
 * @param options Server configuration options.
 */

export const runApp = (
    App: Component,
    options: ServerOptions = {}
): VoidSyncFn | void => {
    const config = options.config ? options.config : {};
    const middleware = options.middleware ? options.middleware : [];
    const cors = options.cors ? options.cors : {};

    if (isServer) {
        // We are in the server. So, we run the server side code.
        runServer(App, config, cors, middleware);
    }
    else {
        // we are in the client. So, we want to hydrate the app.
        return runClient(App, config);
    }
}