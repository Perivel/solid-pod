# Solidus CLI
The SolidusJS CLI.

Commands
- build: Builds the app with Rollup
- dev: Runs the Dev mode server, with Hot Reloading.
- start: Starts the built app in production.

Notes:
- We will need to supply Rollup configuration files for each SSR type: sync, async, stream.
- We use the Rollup JS API to programmatically run the build.


Assumptions:
- commands are run in the root directory of the Solidus project.
- there is an index.ts file which serves as the server entry point in the root directory.
- the assets directory, which will be translated to the public directory is in the root directory.