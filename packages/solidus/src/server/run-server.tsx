/*
BSD 2-Clause License

Copyright (c) 2022, Perivel LLC
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import { DateTime } from '@swindle/core';
import express from 'express';
import { join } from 'path';
import { 
    renderToString, 
    renderToStringAsync,
    renderToStream,
} from 'solid-js/web';
import { Application, Configuration, RenderContext } from '../types/index';
import { Middleware } from './middleware/middleware';

/**
 * runServer()
 * 
 * runs the application server.
 * @param App the application component to run.
 * @param config The server configuration.
 * @param middleware An array of Middleware to register.
 */

export const runServer = (App: Application, config: Configuration, middleware: Middleware[] = []): void => {
  const app = express();

  // set middleware
  app.use(...middleware);

  // register static assets
  app.use(express.static(join(__dirname, 'assets')));

  // register the initial route.
  app.get("*", async (req, res) => {
    const context: RenderContext = {
      server: {
        debug: config.env === "development",
        port: config.port,
        url: req.url,
      },
    };

    if (config.ssr === "stream") {
      // set up streaming ssr.
      renderToStream(() => <App context={context} />).pipe(
        res
      );
    } else {
      // the SSR configuration is set to either synchonous or asynchonous SSR.
      try {
        let page: string;

        if (config.ssr === "async") {
          // set up async ssr.
          page = await renderToStringAsync(() => (
            <App context={context} />
          ));
        } else {
          // set up standard ssr.
          page = renderToString(() => (
            <App context={context} />
          ));
        }
        res.status(200).send(page);
      } catch (e) {
        res.status(500).send("Server Error");
      }
    }
  });

  // start the server.
  console.log("Starting app");
  app.listen(config.port, () => {
    console.log(
      `[${DateTime.Now().toString()}]: Application successfully running on ${
        config.host
      }:${config.port}`
    );
  });
}