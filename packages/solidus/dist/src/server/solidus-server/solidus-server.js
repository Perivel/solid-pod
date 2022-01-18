"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidusServer = void 0;
/**
 * SolidusServer
 *
 * SolidusServer is the base class. This class is not really instanciated. Instead, it is extended in an
 * adaptor to define
 */
class SolidusServer {
    constructor(App, template, config) {
        this.App = App;
        this.template = template;
        this.config = config;
    }
    renderAppSync() {
    }
}
exports.SolidusServer = SolidusServer;
