import { Component } from 'solid-js';
import { RenderContext } from './render-context.type';
export interface ApplicationProps {
    context: RenderContext;
}
/**
 * Application
 *
 * An Application Component is the root of every Solidus Application.
 */
export declare type Application = Component<ApplicationProps>;
