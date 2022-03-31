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

import { Color } from '@swindle/color';
import { RouteDefinition } from "solid-app-router";
import { Component, JSX } from "solid-js";
import { LayoutComponent, RenderContext } from './../types/index';

interface ViewProps {

    /**
     * charset
     * 
     * The character set. Defaults to UTF-8
     */

    charset?: string;

    /**
     * context
     * 
     * the render context to use to create the application.
     */
    
    context: RenderContext,

    /**
     * index
     * 
     * the default component to load. It is equivalent to assigning a component to the '/' route in routes.
     * If index is omitted, be sure you have a '/' route in your routes.
     */

    index?: JSX.Element;

    /**
     * lang
     * 
     * The language to use. Defaults to 'en'
     */

    lang?: string;

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

    themeColor?: Color|string;

    /**
     * title
     * 
     * A Default title to set.
     */

    title?: string;
}

/**
 * ApplicationComponent
 * 
 * The Application Component is the root of of any Solidus application compoent tree.
 */

type ViewComponent = Component<ViewProps>;

export {
    ViewComponent,
    ViewProps
};