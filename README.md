# SolidusJS
Solidus is a plug-and-play Server-Side Rendering solution for SolidJS written in TypeScript.

## Installation
SolidusJS is still not yet released. However, when we do release it, you'll be able to follow the below instructions to begin using Solidus.
```
npx create-solidus-app <my-app>
```
or with Yarn:
```
yarn create solidus-app <my-app>
```

## Usage
At its most basic form, all you have to do to run Solidus is change one line in your `src/index.tsx` file.

```ts
import { runApp, Middleware } from 'solidus-js';
import App from './App';

runApp(App);
```
Notice that the only change we made to our `index.ts` file is we change SolidJS' `render()` call to SolidusJS' `runApp()` call.

At its most simplest form, this is all we need to do. We can now run the application by running `solidus start` at the root of our project directory. This will run our application in SSR mode.

## Helper Primitives
SolidusJS comes with some pre-built primitives to give you access to different pieces of information.

### useServerRequestContext()
The `useServerRequestContext()` primitive will give you access to the server request information. Below is an example of how we may use this primitive to pass routing information from the server to our app.
```ts
// App,tsx
import { Component } from 'solid-js';
import { useServerRequestContext } from 'solidus-js';
import { Router, useRoutes } from 'solid-app-router';
import { routes } from './routes';

const App: Component = () => {
    const req = useServerRequestContext();
    const Routes = useRoutes(routes);

    return (
        <Router url={req()?.url}>
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
import { useEnvironment } from 'solidus-js';
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