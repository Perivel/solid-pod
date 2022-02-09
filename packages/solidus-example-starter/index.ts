import { runServer } from 'solidus';
import configuration from './solidus.config';
import MyApp from './src/solidus';

runServer(MyApp, configuration);