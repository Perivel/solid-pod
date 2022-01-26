# Solidus CLI
The SolidusJS CLI.

Commands
- build: Builds the app with Rollup
- dev: Runs the Dev mode server, with Hot Reloading.
- start: Starts the built app in production.

Notes:
- We will need to supply Rollup configuration files for each SSR type: sync, async, stream.
- We use the Rollup JS API to programmatically run the build.