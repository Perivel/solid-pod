/**
 * utilities/index.ts
 * 
 * Defines common utilities.
 */

import { isServer } from 'solid-js/web';
import { Configuration, Env, SSRMode } from "../types";

/**
 * resolveConfig()
 * 
 * resolves the configuration.
 * @param config the configuration vlaue
 * @returns The resolved configuration value.
 */

export const resolveConfig = (config: Configuration): Configuration => {
    // env
    let env = isServer ? config.env || process.env.ENVIRONMENT as Env : config.env; 
    const envValues = ['production', 'development'];
  
    if (!env) {
      env = 'production'
    }
    else if (!envValues.includes(env!)) {
      throw new Error('Invalid configuration value for `env`');
    }
  
    // host
    let host = isServer ? config.host || process.env.HOST : config.host;
  
    if (!host) {
      host = 'localhost';
    }
  
    // port
    let port = isServer ? config.port || parseInt(process.env.PORT!) : config.port;
  
    if (!port) {
      port = 5000;
    }
  
    // charset
    const charset = config.charset || 'UTF-8';
  
    // lang
    const lang = config.lang || 'en';
  
    // ssr
    const ssr = config.ssr || 'sync' as SSRMode;
  
    return {
      env: env as Env,
      host: host,
      port: port,
      charset: charset,
      lang: lang,
      ssr: ssr
    }
  }