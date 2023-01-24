/**
 * run-dev.ts
 * 
 * run-start.ts defines the runStart command.
 */

import { spawn } from 'child_process'
import { Command } from '../utils/command/command.type';
import { CommandStatus } from '../utils/command/command-status';
import container from '../utils/container';
import { Logger } from '../utils/logger/logger';
import { Directory, Path } from '@chaperone/system';

/**
 * runStart
 * 
 * Starts the application.
 */
export const runStart: Command = async () => {
    const logger = container.get(Logger);
    const serverEntry = Path.FromSegments(Directory.Current().path(), 'dist/index.js');
    let appError: Error|undefined = undefined;
    const appProcess = spawn(`node`, [serverEntry.toString()], {
        cwd: Directory.Current().path().toString()
    });
    appProcess.stdout.setEncoding('utf8');
    appProcess.stderr.setEncoding('utf8');
    appProcess.stdout.on('data', (data) => logger.info(data.toString()));
    appProcess.stderr.on('error', (error) => {
        logger.error(error.message);
        appError = error; 
        appProcess.kill("SIGINT");
    });

    if (appError) {
        return CommandStatus.Error;
    }
    return CommandStatus.Error;
}