# SolidusJS
Solidus is a plug-and-play Server-Side Rendering solution for SolidJS written in TypeScript.

> **Note**: This repository will eventually be merged with the [Main SolidusJS Repository](https://github.com/Perivel/solidus-js) upon completion of the [SolidHack](https://hack.solidjs.com/) hackathon. We are just continuing work in this repository because the main repository cannot be updated during the voting period of the Hackathon. 

## Installation
SolidusJS is still not yet released. However, when we do release it, you'll be able to follow the below instructions to begin using Solidus.
```
npx create-solidus-app <my-app>
```
or with Yarn:
```
yarn create solidus-app <my-app>
```

## Assumptions
SolidusJS assumes all your public assets will be located in your project's `src/assets` directory. In addition, SolidusJS assunes that our client entrypoint is located in `root/src/client.ts`. And, your server entrypoint is located in `root/src/server.ts`. 

## Usage
In order to run your application, you need to define a server entrypoint and a client entrypoint. There are two special files Solidus will look for in order to run your application.

### Server Entry Point
Solidus expects your server entry point to be contained in `src/server.ts`. Below is an example of a typical Solidus server entrypoint file.

```ts
// src/server.ts
import { runServer } from '@solidus-js/server';
import MyApp from 'path/to/root/component/MyApp';
import config from 'path/to/solidus/config';

runServer(MyApp, config, []);
```
The `runServer()` function starts the application server using your root component, as well as a configuration object and an array of middleware to run for every request to the server. The configuration object will specify how your server will be setup. These include how Server-Side Rendering will behave, and things like which port to listen for requests on.

### Client Entry Point
Solidus expects your client entry point to be contained in `src/client.ts`. Below is an example of a typical Solidus client entry point file.

```ts
import { runClient } from '@solidus-js/client';
import MyApp from './MyApp';
import config from './solidus.config';

runClient(MyApp, config);
```
The client entry point is very similar to the server entry point. The `runClient()` function renders your application on the client side, similar to a regular SolidJS application.

With the client and server entry points defined, we can now build our application by running `solidus build`. The built-in `solidus build` command will build our Solidus application, using the configuation settings you provided. Once it is built, we can start the application by running `solidus start`.

## Helper Primitives
SolidusJS comes with some pre-built primitives to give you access to different pieces of information.

### useServer()
The `useServer()` primitive will give you access to the server request information. Below is an example of how we may use this primitive to pass routing information from the server to our app.
```ts
// App,tsx
import { Component } from 'solid-js';
import { useServer } from '@solidus-js/utilities';
import { Router, useRoutes } from 'solid-app-router';
import { routes } from './routes';

const App: Component = () => {
    const server = useServer();
    const Routes = useRoutes(routes);

    return (
        <Router url={server()?.url}>
            <Routes />
        </Router>
    );
}

export default App;
```

### useEnvironment()
The `useEnvironment()` primitive tells us whether our application is in a production or development environment. We can use this to enable or disable features and components that are only meant for use in development. 

Suppose we have an `<Inspect>` componet which lets us inspect our app's HTML during development. We propbably do not want this to be available during production. Below is an example of how we might restrict this using the `useEnvironment()` primitive.
```ts
// MyComponent.tsx
import { Component } from 'solid-js';
import { useEnvironment } from '@solidus-js/utilities';
import Inspect from './Inspect';

const MyComponent: Component = () => {
    const env = useEnvironment();

    return (
        <Inspect disable={() => env() == 'production'}>
            ....
        </Inspect>
    );
}

export default MyComponent;
```

### useIsServer() and useIsClient()
The `useIsServer()` and `useIsClient()` primitives are used to determine if we are currently running on the client or on the server.

# License
SolidusJS is provided under the [MIT](LICENSE) License.