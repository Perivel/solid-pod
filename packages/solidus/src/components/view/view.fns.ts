import { RouteDefinition } from "solid-app-router";
import { Color } from '@swindle/color';

/**
 * routesListContainsIndedxRoute()
 * 
 * determines if the routes list contains the index route.
 * @param routes the routes to check.
 */

export const routesListContainsIndexRoute = (routes: RouteDefinition[]): boolean => {
    return routes.some(route => route.path = '/');
}

/**
 * parseThemeColorHexValue()
 * 
 * parses the theme color.
 * @param dirty the color value to parse.
 * @returns a hexidecimal stirng representing the color value.
 * @throws HexException when the theme color is not a valid hexidecimal value.
 */

export const parseThemeColorHexValue = (dirty?: Color|string): string => {
    if (dirty === undefined) {
        // theme color is not defined. So, we use the default white.
        return Color.White().hex().value();
    }
    else {
        // theme color defined.
        if (dirty instanceof Color) {
            return (dirty as Color).hex().value();
        }
        else {
            // the color is a string. Make sure it is a valid hexidecimal.
            return Color.FromHex((dirty as string)).hex().value();
        }
    }
}