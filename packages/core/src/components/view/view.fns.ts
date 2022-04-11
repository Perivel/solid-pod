/*
BSD 2-Clause License

Copyright (c) 2022, Perivel LLC
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { RouteDefinition } from "solid-app-router";
import { Color } from '@swindle/color';

/**
 * routesListContainsIndedxRoute()
 * 
 * determines if the routes list contains the index route.
 * @param routes the routes to check.
 */

export const routesListContainsIndexRoute = (routes: RouteDefinition[]): boolean => {
    return routes.some(route => route.path === '/');
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