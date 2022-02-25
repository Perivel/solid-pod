import { runServer } from 'solidusjs';
import configuration from './solidus.config';
import MyApp from './MyApp';

runServer(MyApp, configuration, []);