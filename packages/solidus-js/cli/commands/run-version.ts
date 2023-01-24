/**
 * run-version.ts
 * 
 * run-version.ts defines the runVersion command.
 */

 import { Command } from './../utils/command/command.type';
 import { CommandStatus } from './../utils/command/command-status';
 import container from './../utils/container';
 import { Logger } from '../utils/logger/logger';
 import pkg from './../../package.json' assert { type: 'json' };
 
 export const runVersion: Command = async () => {
     const logger = container.get(Logger);
     logger.log(`SolidusJS v${pkg.version}`);
     return CommandStatus.Success;
 }