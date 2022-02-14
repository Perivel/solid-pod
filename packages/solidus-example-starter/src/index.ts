import { runServer } from 'solidus';
import configuration from './solidus.config';
import MyApp from './solidus';

runServer(
    MyApp,
    configuration
);