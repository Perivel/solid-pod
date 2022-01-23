import { Color } from '@swindle/color';
import { RouteDefinition } from "solid-app-router";
import { Component, JSX } from "solid-js";
import { LayoutComponent } from "./layout-component.type";

interface ViewProps {

    /**
     * charset
     * 
     * The character set. Defaults to UTF-8
     */

    charset?: string;

    /**
     * the default component to load. It is equivalent to assigning a component to the '/' route in routes.
     * If index is omitted, be sure you have a '/' route in your routes.
     */

    index?: JSX.Element;

    /**
     * lang
     * 
     * The language to use. Defaults to 'en'
     */
    lang: string;

    /**
     * The layout of the application. If omitted, a default layout will be used.
     * You can define your own custom layout by creating a LayoutComponent
     */

    layout?: LayoutComponent;

    /**
     * Your application routes.
     */

    routes?: RouteDefinition[];

    themeColor: Color|string;

    /**
     * title
     * 
     * A Default title to set.
     */

    title?: string;

    /**
     * The url of the route to load. This will be set by the server.
     */
    
    url?: string;
}

/**
 * ApplicationComponent
 * 
 * The Application Component is the root of of any Solidus application compoent tree.
 */

export type ViewComponent = Component<ViewProps>;