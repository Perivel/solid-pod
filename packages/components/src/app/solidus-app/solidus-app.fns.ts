// =============================================
// Helper functions for SolidusApp component.
// =============================================

import { RouteDefinition } from 'solid-app-router';

/**
 * routesContainsIndex()
 * 
 * determines if the routes array contains an index route (a route with the path '/').
 * @param routes the routes array.
 * @returns true if the routes contains an index route. False otherwise.
 */

export const routesContainsIndex = (routes: RouteDefinition[]): boolean => {
    return routes.some(route => route.path === '/');
}