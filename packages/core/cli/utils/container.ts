import { Container } from '@swindle/container';
import { StringFormatter } from '@swindle/core';
import { Logger } from './logger/logger';

const container = new Container();
container.bind(Logger, _ => new Logger());
container.bind(StringFormatter, _ => new StringFormatter());

export default container;