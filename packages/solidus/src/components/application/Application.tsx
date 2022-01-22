import { Router, useRoutes } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';
import { ApplicationComponent } from '../../types/application-component.type';
import SolidusError from '../error/SolidusError';
import DefaultLayout from '../layout/DefaultLayout';
import { routesListContainsIndexRoute } from './application.fns';

/**
 * Application
 * 
 * The Application component should be the root of any Solidus website.
 * @note Using lazy() in the routes array seems to cause the route to not be defined. Need to fix this bug.
 */

const Application: ApplicationComponent = (props) => {
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
      <div>
        <MetaProvider>
          <Router url={url}>
            <Layout content={<Content />} />
          </Router>
        </MetaProvider>
      </div>
    );
}

export default Application;