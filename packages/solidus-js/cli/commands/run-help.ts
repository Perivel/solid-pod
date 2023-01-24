/**
 * run-help.ts
 * 
 * run-help.ts defines the runHelp command.
 */

import { DateTime } from '@chaperone/util';
import { Command } from '../utils/command/command.type';
import { CommandStatus } from '../utils/command/command-status';
import container from '../utils/container';
import { Logger } from '../utils/logger/logger';
import pkg from './../../package.json' assert { type: 'json' };

export const runHelp: Command = async () => {
    const logger = container.get(Logger);
    const helpMessage = `
SolidusJS v${pkg.version}
Usage:               solidus <command>
-v                   Displays the current version of SolidusJS being run.
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