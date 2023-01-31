import { Container } from '@chaperone/util/container';
import { StringFormatter } from '@chaperone/util';
import { Logger } from './logger/logger';

const container = new Container();
container.bind(Logger, _ => new Logger());
container.bind(StringFormatter, _ => new StringFormatter());

export default container;