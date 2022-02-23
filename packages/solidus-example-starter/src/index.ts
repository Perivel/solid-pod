import { runServer } from 'solidus-js';
import configuration from './solidus.config';
import MyApp from './MyApp';

runServer(MyApp, configuration, []);