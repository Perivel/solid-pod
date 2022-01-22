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
    // process props.
    const routes = props.routes ? props.routes : [];
    const Layout =  props.layout ? props.layout : DefaultLayout;
    const url = props.url;

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
            const error = new Error('No index route defined');
            routes.push({
              path: '/',
              component: () => <SolidusError error={error}
              />
            });
        }
    }

    const Content = useRoutes(routes);

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