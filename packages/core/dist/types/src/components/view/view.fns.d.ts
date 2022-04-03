import { RouteDefinition } from "solid-app-router";
import { Color } from '@swindle/color';
/**
 * routesListContainsIndedxRoute()
 *
 * determines if the routes list contains the index route.
 * @param routes the routes to check.
 */
export declare const routesListContainsIndexRoute: (routes: RouteDefinition[]) => boolean;
/**
 * parseThemeColorHexValue()
 *
 * parses the theme color.
 * @param dirty the color value to parse.
 * @returns a hexidecimal stirng representing the color value.
 * @throws HexException when the theme color is not a valid hexidecimal value.
 */
export declare const parseThemeColorHexValue: (dirty?: string | Color | undefined) => string;
