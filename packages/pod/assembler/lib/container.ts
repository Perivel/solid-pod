/**
 * container.ts
 * 
 * container.ts contains the dependency container for common 
 */

import { Container } from '@chaperone/util/container';
import { StringFormatter } from '@chaperone/util';

const container = new Container();
container.bind(StringFormatter, _ => new StringFormatter());
export default container;