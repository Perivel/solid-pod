/**
 * signals/index.ts
 * 
 * signals/index.ts contains store definitions for stores holding server information.
 * These definitions are intended to be used in both client and server side.
 */

 import { createSignal } from 'solid-js';
 import { Env, ServerRequestContext } from './../types/index';
 
 const [serverRequest, setServerRequest] = createSignal<ServerRequestContext>();
 const [environment, setEnvironment] = createSignal<Env>()
 
 export {
     serverRequest,
     environment,
     setServerRequest,
     setEnvironment
 };