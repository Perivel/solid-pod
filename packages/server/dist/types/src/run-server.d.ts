import { Application, Configuration } from "@solidusjs/core";
import { Middleware } from "./middleware";
/**
 * runServer()
 *
 * runs the application server.
 * @note THis function is intended to only run on the server.
 * @param App the application component to run.
 * @param config The server configuration.
 * @param middleware An array of Middleware to register.
 */
export declare const runServer: (App: Application, config: Configuration, middleware?: Middleware[]) => void;
