"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solid_meta_1 = require("solid-meta");
/**
 * Server
 *
 * The Server Component
 */
const Server = (props) => {
    return (<solid_meta_1.MetaProvider tags={props.tags}>
            {props.children}
        </solid_meta_1.MetaProvider>);
};
exports.default = Server;
