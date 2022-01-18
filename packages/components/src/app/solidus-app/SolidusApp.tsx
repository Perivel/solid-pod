import { Component, mergeProps } from 'solid-js';
import { RouteDefinition, useRoutes } from 'solid-app-router';
import { routesContainsIndex } from './solidus-app.fns';

export interface SolidusAppProps {
    index?: Component,
    theme?: any,
    routes?: RouteDefinition[]
}

const defaultProps: SolidusAppProps = {
    routes: []
}

const SolidusApp: Component<SolidusAppProps> = (props) => {

    // normalize the props.
    const appProps = mergeProps(defaultProps, props);

    // set the theme data.

    // check if there is an index route.
    if (!routesContainsIndex(appProps.routes!) && !appProps.index) {
        appProps.routes!.push({
            path: '/',
            component: appProps.index!
        });
    }
    else {
        // there is no index specified.
        throw new Error("No Index Component or Index Route defined.");
    }

    const Routes = useRoutes(appProps.routes!);

    return <div>
        <Routes />
    </div>
}

export default SolidusApp;