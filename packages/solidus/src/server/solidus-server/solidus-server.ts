import { JSX } from 'solid-js';

/**
 * SolidusServer
 * 
 * SolidusServer is the base class. This class is not really instanciated. Instead, it is extended in an 
 * adaptor to define 
 */

export abstract class SolidusServer {

    constructor(
        protected readonly app: JSX.Element,
        protected readonly template: string,
        protected readonly config: any
    ) { }

    /**
     * start()
     * 
     * starts the server
     */

    public abstract start(): Promise<void>;
}