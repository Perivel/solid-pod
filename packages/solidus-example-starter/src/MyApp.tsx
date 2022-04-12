import { Application, View } from '@solidusjs/core';
import App from "./App";
import About from './About';

const MyApp: Application = (props) => {
    return <View
        context={props.context}
        index={<App />}
        routes={[
            {
                path: '/about',
                component: About
            }
        ]}
    />;
}

export default MyApp;