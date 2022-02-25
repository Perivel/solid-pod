import { Application, View } from 'solidusjs';
import App from "./App";

const MyApp: Application = (props) => {
    return <View 
        index={<App />}
        url={props.url}
        serverOptions={props.serverOptions}
    />;
}

export default MyApp;