import { JSX } from 'solid-js';
/**
 * SolidusServer
 *
 * SolidusServer is the base class. This class is not really instanciated. Instead, it is extended in an
 * adaptor to define
 */
export declare abstract class SolidusServer {
    protected readonly app: JSX.Element;
    protected readonly template: string;
    protected readonly config: any;
    constructor(app: JSX.Element, template: string, config: any);
    /**
     * start()
     *
     * starts the server
     */
    abstract start(): Promise<void>;
}
//# sourceMappingURL=solidus-server.d.ts.map