import { Container } from '@chaperone/util/container';
import { StringFormatter } from '@chaperone/util';
import { Logger } from './logger/logger';
import { PackageDetails } from './package-details.interface';
import pkg from './../../package.json' assert { type: 'json' };

const container = new Container();
container.bind(Logger, _ => new Logger());
container.bind(StringFormatter, _ => new StringFormatter());
container.bind(PackageDetails, _ => new PackageDetails(pkg.name, pkg.version));

export default container;