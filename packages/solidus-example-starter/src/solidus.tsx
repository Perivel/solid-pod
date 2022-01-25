import { Application, View } from 'solidus';
import App from "./App";

const MyApp: Application = (props) => {
    return <View 
        index={<App />}
        url={props.url}
        serverOptions={props.serverOptions}
    />;
}

export default MyApp;