import { runServer } from '@solidusjs/server';
import configuration from './solidus.config';
import MyApp from './MyApp';

runServer(MyApp, configuration, []);