import { runClient } from '@solidusjs/client';
import MyApp from './MyApp';
import config from './solidus.config';

runClient(MyApp, config);