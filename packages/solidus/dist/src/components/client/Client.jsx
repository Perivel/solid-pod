"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solid_meta_1 = require("solid-meta");
/**
 * Client
 *
 * The Client component.
 */
const Client = (props) => {
    return (<solid_meta_1.MetaProvider>
            {props.children}
        </solid_meta_1.MetaProvider>);
};
exports.default = Client;
