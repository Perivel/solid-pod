import { Component } from 'solid-js';
import { useServer } from 'solid-pod';
import { useRoutes, Router, RouteDefinition } from '@solidjs/router';
import Home from './Home';
import About from './About';

const App: Component = () => {
  const routes: RouteDefinition[] = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ];

  const server = useServer();
  const Routes = useRoutes(routes);

  return (
    <Router url={server()?.url}>
      <Routes />
    </Router>
  );
};

export default App;
