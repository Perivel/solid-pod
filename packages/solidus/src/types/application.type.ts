import { Component } from 'solid-js';

export interface ApplicationProps {
    url?: string;
}

/**
 * Application
 * 
 * An Application Component is the root of every Solidus Application.
 */

export type Application = Component<ApplicationProps>;