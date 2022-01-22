import { Component, JSX } from 'solid-js';

/**
 * LayoutProps
 * 
 * Props of a Solidus Layout component. This interface should be extended when creating your own custom layouts.
 */

export interface LayoutProps {
    constent: JSX.Element;
}

/**
 * LayoutComponent
 * 
 * A Layout Component type. 
 */

export type LayoutComponent = Component<LayoutProps>