import { RouteDefinition } from "solid-app-router";
import { Component, JSX } from "solid-js";
import { LayoutComponent } from "./layout-component.type";

export interface ApplicationProps {
    index?: JSX.Element;
    layout?: LayoutComponent;
    routes?: RouteDefinition[];
}

/**
 * ApplicationComponent
 * 
 * The Application Component is the root of of any Solidus application compoent tree.
 */

export type ApplicationComponent = Component<ApplicationProps>;