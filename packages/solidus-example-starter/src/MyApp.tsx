import { Application, View } from 'solidusjs';
import App from "./App";

const MyApp: Application = (props) => {
    return <View 
        context={props.context}
        index={<App />} 
    />;
}

export default MyApp;