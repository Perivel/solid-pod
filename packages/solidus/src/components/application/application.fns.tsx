import { RouteDefinition } from "solid-app-router";

/**
 * routesListContainsIndedxRoute()
 * 
 * determines if the routes list contains the index route.
 * @param routes the routes to check.
 */

export const routesListContainsIndexRoute = (routes: RouteDefinition[]): boolean => {
    return routes.some(route => route.path = '/');
}