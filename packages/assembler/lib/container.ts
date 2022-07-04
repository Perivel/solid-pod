/**
 * container.ts
 * 
 * container.ts contains the dependency container for common 
 */

import { Container } from '@swindle/container';
import { StringFormatter } from '@swindle/core';

const container = new Container();
container.bind(StringFormatter, _ => new StringFormatter());
export default container;