/**
 * Capsule.tsx
 * 
 * Capsule.tsx contains the component definition for the Solidus Capsule component. The Capsule component
 * is used internally to initialize certain application information on the server side.
 */

 import { Component, JSX } from 'solid-js';
 import { MetaProvider } from 'solid-meta';
 import { Env } from './../types';
 import {
     setEnvironment,
     setServerRequest
 } from './../signals';
 
 /**
  * TagDescription
  * 
  * An interface defining a Tag.
  */
 export interface TagDescription {
     tag: string;
     props: Record<string, unknown>;
     id: string;
 }
 
 interface CapsuleProps {
     url?: string;
     ip?: string;
     env: Env;
     tags: TagDescription[];
     children: JSX.Element
 }
 
 /**
  * Capsule
  * 
  * A special component used to intialize server options for Applications.
  */
 
 const Capsule: Component<CapsuleProps> = (props) => {
     setEnvironment(props.env);
     setServerRequest({ url: props.url, ip: props.ip });
     //return <MetaProvider tags={props.tags}>{props.children}</MetaProvider>;
     return <MetaProvider tags={props.tags}>{props.children}</MetaProvider>;
 };

 export default Capsule;