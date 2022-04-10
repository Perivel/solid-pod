import { Color } from '@swindle/color';
import { RouteDefinition } from "solid-app-router";
import { Component, JSX } from "solid-js";
import { LayoutComponent } from './layout-component.type';
import { RenderContext } from './render-context.type';
export interface ViewProps {
    /**
     * context
     *
     * the render context to use to create the application.
     */
    context: RenderContext;
    /**
     * index
     *
     * the default component to load. It is equivalent to assigning a component to the '/' route in routes.
     * If index is omitted, be sure you have a '/' route in your routes.
     */
    index?: JSX.Element;
    /**
     * The layout of the application. If omitted, a default layout will be used.
     * You can define your own custom layout by creating a LayoutComponent
     */
    layout?: LayoutComponent;
    /**
     * routes
     *
     * Your application routes.
     */
    routes?: RouteDefinition[];
    /**
     * themeColor
     *
     * The Theme color.
     */
    themeColor?: Color | string;
}
/**
 * ApplicationComponent
 *
 * The Application Component is the root of of any Solidus application compoent tree.
 */
export declare type ViewComponent = Component<ViewProps>;
