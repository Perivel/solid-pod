import { Component, JSX } from 'solid-js';
/**
 * LayoutProps
 *
 * Props of a Solidus Layout component. This interface should be extended when creating your own custom layouts.
 */
export interface LayoutProps {
    content: JSX.Element;
}
/**
 * LayoutComponent
 *
 * A Layout Component type.
 */
export declare type LayoutComponent = Component<LayoutProps>;
