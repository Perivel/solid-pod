import { runServer } from 'solidus';
import configuration from './solidus.cnfig';
import MyApp from './src/solidus';

runServer(MyApp, configuration);