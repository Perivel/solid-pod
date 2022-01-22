import { Component } from 'solid-js';

export interface ErrorProps {
    error: Error;
}

/**
 * SolidusError 
 * 
 * This is a component to display runtime errors with the library.
 */

const SolidusError: Component<ErrorProps> = (props) => {

    return (
        <div>
            <h1>Error: {props.error.message}</h1>
            <p>{props.error.stack}</p>
        </div>
    );
}

export default SolidusError;