import { runServer } from 'solidus';
import configuration from './solidus.config';
import MyApp from './MyApp';

runServer(MyApp, configuration, []);