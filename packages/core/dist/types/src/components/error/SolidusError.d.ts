import { Component } from 'solid-js';
export interface ErrorProps {
    error: Error;
}
/**
 * SolidusError
 *
 * This is a component to display runtime errors with the library.
 */
declare const SolidusError: Component<ErrorProps>;
export default SolidusError;
