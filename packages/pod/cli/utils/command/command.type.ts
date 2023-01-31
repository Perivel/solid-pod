import { CommandStatus } from "./command-status"

/**
 * Command
 * 
 * The command type
 */

export type Command = (...args: any[]) => Promise<CommandStatus>;