import { Router, useRoutes } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';
import { ViewComponent } from '../../types/view-component.type';
import SolidusError from '../error/SolidusError';
import DefaultLayout from '../layout/DefaultLayout';
import { routesListContainsIndexRoute } from './view.fns';

/**
 * View
 * 
 * A solidus component that automatically sets up routing and a default template.
 * @note Using lazy() in the routes array seems to cause the route to not be defined. Need to fix this bug.
 */

const View: ViewComponent = (props) => {
    let routes = props.routes ? props.routes : [];
    const url = props.url;
    let hasSolidusError = false;

    // resolve the routes.
    if (!routesListContainsIndexRoute(routes)) {
        // there is no index path in the routes array. So, we need to check if 
        // the index prop is set so we can use that as the index route.

        if (props.index) {
            // there is an index component. So, we can assign that as the index route.
            routes.push({
                path: '/',
                component: () => props.index,
            });
        }
        else {
            // there is no index route or index component. We cannot proceed.
            // So, we display the Solidus Error page, disregarding all the other
            // routes.
            const error = new Error('No index route defined');
            hasSolidusError = true;
            routes = [
              {
                path: "/",
                component: () => <SolidusError error={error} />,
              },
            ];
        }
    }

    const Content = useRoutes(routes);

    // prepare the layout.

    // When there is a SolidusError, we revert back to the DefaultLayout regardless of whether there is a 
    // custom layout specified.
    const Layout = (props.layout) && !hasSolidusError ? props.layout : DefaultLayout;

    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="shortcut icon"
            type="image/ico"
            href="/src/assets/favicon.ico"
          />
          <title>Solid App</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div>
            <MetaProvider>
              <Router url={url}>
                <Layout content={<Content />} />
              </Router>
            </MetaProvider>
          </div>
        </body>
      </html>
    );
}

export default View;

