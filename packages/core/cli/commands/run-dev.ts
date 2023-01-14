/**
 * run-dev.ts
 * 
 * run-dev.ts defines the runDev command.
 */

import { Command } from './../utils/command/command.type';
import { CommandStatus } from './../utils/command/command-status';
import container from './../utils/container';
import { Logger } from '../utils/logger/logger';

export const runDev: Command = async () => {
    const logger = container.get(Logger);
    logger.error("Command not implemented.");
    return CommandStatus.Error;
}