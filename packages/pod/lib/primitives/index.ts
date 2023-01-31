/**
 * primitives/index.ts
 * 
 * primitives/index.ts defines common primitives.
 */

 import {
    Accessor,
    createSignal
} from 'solid-js';
import { isServer } from 'solid-js/web';
import {
    environment,
    serverRequest,
} from './../signals';
import {
    Env,
    ServerRequestContext
} from './../types';

/**
 * useServerRequestContext()
 * 
 * The userServerRequestContext() primitive gives access to the initial server request.
 */

 export const useServer = (): Accessor<ServerRequestContext|undefined> => {
    return serverRequest;
};

/**
 * useEnvironment()
 * 
 * The useEnvironment() primitive gives access to the current application environment (development, production)
 */

export const useEnvironment = (): Accessor<Env|undefined> => {
    return environment;
};

/**
 * useIsServer()
 * 
 * The useIsServer() primitives determines if you are currently running on the server. useIsServer() is the
 * inverse of useIsClient()
 */

export const useIsServer = (): Accessor<boolean|undefined> => {
    const [isServerEnv] = createSignal(isServer);
    return isServerEnv;
};

/**
 * useIsClient()
 * 
 * The useIsClient() primitive determines if you are currently running in the browser. useIsClient() is the 
 * inverse of useIsServer().
 */

export const useIsClient = (): Accessor<boolean|undefined> => {
    const [isClientEnv] = createSignal(!isServer);
    return isClientEnv;
};