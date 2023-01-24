/**
 * run-version.ts
 * 
 * run-version.ts defines the runVersion command.
 */

 import { Command } from './../utils/command/command.type';
 import { CommandStatus } from './../utils/command/command-status';
 import container from './../utils/container';
 import { Logger } from '../utils/logger/logger';
 import { version } from './../../package.json' assert { type: 'json' };
 
 export const runVersion: Command = async () => {
     const logger = container.get(Logger);
     logger.log(`SolidusJS v${version}`);
     return CommandStatus.Success;
 }