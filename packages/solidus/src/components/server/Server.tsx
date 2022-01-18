import { Component } from "solid-js";
import { MetaProvider } from "solid-meta";
import ServerProps from './server.props';

/**
 * Server
 * 
 * The Server Component
 */

const Server: Component<ServerProps> = (props) => {
    return (
        <MetaProvider tags={props.tags}>
            { props.children }
        </MetaProvider>
    );
}

export default Server;