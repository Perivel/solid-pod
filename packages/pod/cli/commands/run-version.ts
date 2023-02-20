/**
 * run-version.ts
 * 
 * run-version.ts defines the runVersion command.
 */

 import { Command } from './../utils/command/command.type';
 import { CommandStatus } from './../utils/command/command-status';
 import container from './../utils/container';
 import { Logger } from '../utils/logger/logger';
 import { PackageDetails } from '../utils/package-details.interface';
 
 export const runVersion: Command = async () => {
     const logger = container.get(Logger);
     const details = container.get(PackageDetails);
     logger.log(`${details.name} v${details.version}`);
     return CommandStatus.Success;
 }