import { Application, View } from '@solidusjs/core';
import App from "./App";

const MyApp: Application = (props) => {
    return <View
        context={props.context}
        index={<App />} 
    />;
}

export default MyApp;