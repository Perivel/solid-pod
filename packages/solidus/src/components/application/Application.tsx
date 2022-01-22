import { useRoutes } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';
import { ApplicationComponent } from '../../types/application-component.type';
import DefaultLayout from '../layout/DefaultLayout';
import { routesListContainsIndexRoute } from './application.fns';

/**
 * Application
 * 
 * The Application component should be the root of any Solidus website.
 */

const Application: ApplicationComponent = (props) => {
    // merge the props
    const routes = props.routes ? props.routes : [];
    const Layout =  props.layout ? props.layout : DefaultLayout;

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
            throw new Error('Index Route ')
        }
    }

    const Content = useRoutes(routes);

    return (
      <div>
        <MetaProvider>
          <Layout content={<Content />} />
        </MetaProvider>
      </div>
    );
}

export default Application;