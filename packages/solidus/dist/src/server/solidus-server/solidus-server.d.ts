import { Component } from 'solid-js';
/**
 * SolidusServer
 *
 * SolidusServer is the base class. This class is not really instanciated. Instead, it is extended in an
 * adaptor to define
 */
export declare abstract class SolidusServer {
    protected readonly App: Component;
    protected readonly template: string;
    protected readonly config: any;
    constructor(App: Component, template: string, config: any);
    private renderAppSync;
    /**
     * start()
     *
     * starts the server
     */
    abstract start(): Promise<void>;
}
//# sourceMappingURL=solidus-server.d.ts.map