import { RouteDefinition } from "solid-app-router";
import { Component, JSX } from "solid-js";
import { LayoutComponent } from "./layout-component.type";

export interface ApplicationProps {
    /**
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
     * Your application routes.
     */

    routes?: RouteDefinition[];

    url?: string;
}

/**
 * ApplicationComponent
 * 
 * The Application Component is the root of of any Solidus application compoent tree.
 */

export type ApplicationComponent = Component<ApplicationProps>;