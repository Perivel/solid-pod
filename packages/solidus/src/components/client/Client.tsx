import { Component } from 'solid-js';
import { MetaProvider } from 'solid-meta';
import ClientProps from './client.props';

/**
 * Client
 * 
 * The Client component.
 */

const Client: Component<ClientProps> = (props) => {
    return (
        <MetaProvider>
            { props.children }
        </MetaProvider>
    );
}

export default Client;