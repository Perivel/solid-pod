# solidus-redesign
This repository contains the redesigned SolidusJS v2

# The New Design
The new design will follow a similar philosophy to the original initially developed for the SolidHack hackathon. However, changes have been made to make the library more streamlined. 

## the Package Structure
In the original design, SolidusJS had the following package structure:
- **Core** consisted of the predefined components, configuration, and types.
- **Utilities** ocnsisted of the build functions for constructing Solidus apps.
- **Client** consisted of the `runClient()` function.
- **Server** consisted of the `runServer()` functiono.
- **Solidus** was a all-in-one package that imported all the other components, as well as defined the CLI tool to make everything happened.

In the redesign, we weill have the following package structure:
- **solidus-js** package will contain the main library and the CLI (core, and solidus from the old module).
- **solidus-js/client** will contain the `runClient()` function, as well as other client-only functions.
- **solidus-js/server** will consist of the `runServer` function as well as any server-only features.
- **solidus-js-tools** will contain all the build dev tools and utilities.

## Server-Side Rendering Mechanism
The original design relied on a two-tier mechanism, where a bridge component called an `Application` interfaced with the Server and passed a `context` to the application consisting of the request details. It would then be up to the Application bridge to pass that context to its `View` which uded that to display the appropriate information, such as routing. While this worked, it is very inconvenient. Additionally, it fails to take advantage of some of SolidJS' features to improve developer experience (DX). 

In the redesign, we will shift this mechanism into a two-tier mechanism, better utilizing SolidJS' features. This new mechanism is made up of three phases:
1. The server initialization phase.
2. The Bridge phase
3. The client access phase

### 1. Server Initialization Phase
The server initialization phase is done through a special internal-only component called a `Capsule`. A capsule is responsible for initializing the server configuration through a store, which will be made available for client access through a built-in primitive called `useServer()`. The data to be collected will include:
1. request URL
2. request headers
3. other request data.
4. the current environment (development or production)

### 2. The Bridge Phase
The Bridge phase, as its name implies forms a connection between the client access phase and the server initialization phase. There is no special component or anything to encapsulate this phase. Since the initial information has already been placed in a store during the previous phase, there is no need to pass any data down. This phase is represented by a regular SolidJS component, which will be passed to `runServer()` and `runClient()` respectively.This seemingly ordinary component however, will be the gateway to the last phase.

### 3. The Client Access Phase
The final phase in this mechanism is the Client Access Phase. In this phase, routing, layouts, and other client-side details are initialized. This phase is left to be defined by the end-user.

## Built-in Primitives
SolidusJS currently contains no built-in primitives. The redesign will introduce some very useful built-in primitives.

### 1. useIsServer()/useIsClient()
The `useIsServer()` and the `useIsClient()` primitives will quickly allow a user to determine if they are currently running on the server or on the client, and perform operations accordingly.

### 2. useEnvironment()
The `useEnvironment()` primitive can inform the user if the application is running on development mode or on production mode.

### 3. useServer()
The `useServer()` primitive will give the user access to the server-initialized data from the first phase.

## Build Tools
Currently, SolidusJS consists of a single build utility to build applications using SolidusJS. The redesigned version will a new tool which is meant specifically to build component libraries with SolidusJS.

## Conventions
SolidusJS will retain its current convention of having the client entry at `src/client.ts`, the server entry at `src/server.ts`, and the public directory located at `src/assets`. However, in addition, SolidusJS will also have the main stylesheet located at `src/assets/index.css`.