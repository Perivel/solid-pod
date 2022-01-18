import { CORSOptions } from './cors-options.interface';
import { Environment } from './types/env.type';
import { SSRType } from './types/ssr.type';

/**
 * The Clngihuration Object
 */

export interface SolidusConfiguration {
    env: Environment,
    port: number,
    title: string,
    headers: any[],
    ssr: SSRType,
    cors: CORSOptions,
}