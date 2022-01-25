# SolidusJS
![Solidus Logo](logo.png)

Solidus is a plus-and-play Server-Side Rendering solution for SolidJS.

> **Note**: Solidus is still in development and not yet usable.

## Concepts
Solidus is made up of three concepts: Applications, Views, and Layouts. 

### Applications
Applications are containsers for your app. All Solidua apps consist of **one** Application component, which is the root component the Solidus server will run. Application components receive three props passed to it by the server. The `url` prop is the url segment your server receivs. `debug` is a flag that indicates whether or not the application is running on debug mode. Finally, the `port` prop specifies which port the application is running on. All Applications, return a `View` component, which is discussed below.

### Views
Views have one responsibility: To set up how your Application behaves. This includes setting up routing or setting up layouts. You can think of a `View` as the backbone of your application. 

### Layouts
Layouts are special components that define how content is presented in your application. 

## Creating a Solidus Application
Solidus applications are just ordinary SolidJS applications wrapped in an `Application` component. Because of this, it is very straightforward to convert an existing SolidJS application to a Solidus application. 
```tsx
// In your root application component file.
import { Application, DefaultLayout, View } from 'solidus';
import App from 'path/to/solid/App';
import { routes } from 'path/to/other/routes';

const MyApp: Application = (props) => {
    return (
        <View 
            index={<App />}
            layout={DefaultLayout}
            routes={routes}
            url={props.url}
            serverOptions={props.serverOptions}
        />
    );
}

export default MyApp;
```
Notice that our SolidJS app is wrapped in a Solidus `View` component, which is returned by a Solidus `Appliation` component. As mentioned earlier, `Views` are responsible for setting up how our application behaves. These responsibilities include setting up routing, our index or main component, and layout. You may have also noticed the `url` and `serverOptions` props. These are props that are passed to our application by the Solidus server.

That is pretty much all you need to do to set up Server Side Rendering with Solidus. All that is left is to run the server.

## Running your Solidus application.
In order to run your application, you need to define a server entrypoint.

```ts
// your server entry ts file.
import { runServer } from 'solidus';
import MyApp from 'path/to/root/component/MyApp';
import config from 'path/to/solidus/config';

runServer(<MyApp />, config);
```
The `runServer()` function starts the application server using the `Application` component you defined, as well as a configuration object. The configuration object will specify how your server will be setup. These include which directory to use for public assets, how Server-Side Rendering will behave, and any middleware you want to define. Solidus uses [Polka](https://github.com/lukeed/polka) under the hood, which is a very performant micro-server package.