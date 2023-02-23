#!/usr/bin/env node

/**
 * cli/index.ts
 * 
 * cli/index.ts is the entry point for the Solidus CLI
 */

// import { Process } from '@chaperone/system';
import { Command } from './utils/command/command.type';
import { CommandStatus } from './utils/command/command-status';
import { CommandType } from './utils/command/command-type';
import { runBuild } from './commands/run-build';
import { runDev } from './commands/run-dev';
import { runHelp } from './commands/run-help';
import container from './utils/container';
import { Logger } from './utils/logger/logger';
import { runStart } from './commands/run-start';
import { runVersion } from './commands/run-version';
import { PackageDetails } from './utils/package-details.interface';

const runCli: Command = async () => {
    const [node, app, ...args] = process.argv;
    const cmd = args[0];

    if (cmd === CommandType.Build) {
        return await runBuild();
    }
    else if (cmd === CommandType.Dev) {
        return await runDev();
    }
    else if (cmd === CommandType.Help) {
        return await runHelp();
    }
    else if (cmd === CommandType.Start) {
        return await runStart();
    }
    else if (cmd === CommandType.Version) {
        return await runVersion();
    }
    else {
        // invalid command
        container.get(Logger).error(`Invalid command. Run \'${container.get(PackageDetails).name} -h\' to get a full list of commands.`);
        return CommandStatus.Success;
    }
}

runCli();