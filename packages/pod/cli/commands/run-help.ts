/**
 * run-help.ts
 * 
 * run-help.ts defines the runHelp command.
 */

import { DateTime, StringFormatter } from '@chaperone/util';
import { Command } from '../utils/command/command.type';
import { CommandStatus } from '../utils/command/command-status';
import container from '../utils/container';
import { Logger } from '../utils/logger/logger';
import { PackageDetails } from '../utils/package-details.interface';

export const runHelp: Command = async () => {
    const logger = container.get(Logger);
    const strFmt = container.get(StringFormatter);
    const details = container.get(PackageDetails);
    const helpMessage = `
${details.name} v${details.version}
Usage:               solid <command>
-v                   Displays the current version of ${strFmt.capitalCase(details.name)} being run.
-h                   Shows this help message.

Commands
    build             Builds the application for production.
    dev               Starts the application in Development Mode.
    start             Starts the application in production.

© ${DateTime.Now().year} Perivel LLC. All rights reserved.
     `;
    logger.log(helpMessage);
    return CommandStatus.Success;
}