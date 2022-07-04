# SolidusJS Example: Counter
This repository contains an example application to illustrate how SolidusJS can be used.

# Usage
At this early stage of development, you will need to use Lerna to run this example. 

First, you need to install all the dependencies.
```
lerna bootstrap && lerna run build && lerna link
```
This command will build the library and link all the dependencies, including the needed `solidus` CLI. Then, we can build and run the application with the following commands.
```
solidus build && solidus start
```
If all goes well, the application is now running in `localhost:5000`. Point your browser there, and you should see an SSR-enabled counter application.