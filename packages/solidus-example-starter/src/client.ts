import { runClient } from 'solidusjs';
import MyApp from './MyApp';
import config from './solidus.config';

runClient(MyApp, config);