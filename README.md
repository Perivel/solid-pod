# SolidusJS
![Solidus Logo](logo.png)

Solidus is a plug-and-play Server-Side Rendering solution for SolidJS.

> **Note**: Solidus is still in development and not yet usable.

## Concepts
Solidus is made up of three concepts: Applications, Views, and Layouts. 

### Applications
Applications are containsers for your app. All Solidua apps consist of **one** Application component, which is the root component the Solidus server will run. Application components return `View` compoents, which are special components that set up the behavior of your app. Application components receive certain parameters from the server, such as the `url` that was requested, as well as other details like wheter the application is running in debug mode (development) or in production. In most cases, these parameters will just be forwarded to the `View` component returned by the `Application` component.

### Views
Views have one responsibility: To set up how your Application behaves. This includes setting up routing or setting up layouts. You can think of a `View` as the backbone of your application. 

### Layouts
Layouts are special components that define how content is presented in your application. Layouts are usually used to specify Application-wide UI elements such as sidebars and headers.

## Creating a Solidus Application
Solidus applications are just ordinary SolidJS applications wrapped in an `Application` component. Because of this, it is very straightforward to convert an existing SolidJS application to a Solidus application. 
```tsx
// In your root application component file.
import { Application, DefaultLayout, View } from 'solidus';
import App from 'path/to/solid/App';
import About from 'path/to/About';

const MyApp: Application = (props) => {
    return (
        <View 
            index={<App />}
            layout={DefaultLayout}
            routes={[
                {
                    path: '/about',
                    component: About
                }
            ]}
            url={props.url}
            serverOptions={props.serverOptions}
        />
    );
}

export default MyApp;
```
Notice that our SolidJS app is wrapped in a Solidus `View` component, which is returned by a Solidus `Appliation` component. As mentioned earlier, `Views` are responsible for setting up how our application behaves. One of these responsibilities is setting up routing. Solidus routes are just regular SolidJS `RouteDefinition` instances. So, you can quickly and easily import your SolidJS routes array and pass it to your `View` component. 

The second responsiblity of Solidus `View` components is to render our application using the specified layout. In the above example, we explicitly specified the `DefaultLayout` in the to illustrate how layouts are set. However, if the `layout` prop is omitted, Solidus will fall back on the `DefaultLayout`. You may want to rely on the `DefaultLayout` if, say, your existing SolidJS App component defines its own common layout.

Lastly, notice that we pass a `url` and a `serverOptions` prop to our `View` component. These are special props which are passed to our `Application` by the Solidus server. These properties should be passed directly to the `View` component without modification.

That is pretty much all you need to do to set up Server Side Rendering with Solidus. All that is left is to run the server.

## Running your Solidus application.
In order to run your application, you need to define a server entrypoint.

```ts
// your server entry ts file.
import { runServer } from 'solidus';
import MyApp from 'path/to/root/component/MyApp';
import config from 'path/to/solidus/config';

runServer(MyApp, config);
```
The `runServer()` function starts the application server using the `Application` component you defined, as well as a configuration object. The configuration object will specify how your server will be setup. These include which directory to use for public assets, how Server-Side Rendering will behave, and any middleware you want to define. Solidus uses [Polka](https://github.com/lukeed/polka) under the hood, which is a very performant micro-server package.