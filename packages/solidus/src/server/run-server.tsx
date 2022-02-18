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
import Polka from 'polka';
import serve from 'serve-static';
import { join } from 'path';
import { 
    renderToString, 
    renderToStringAsync, 
    renderToStream
} from 'solid-js/web';
import { Configuration } from './configuration/configuration';
import { Application } from '../types/application.type';
import { ServerOptions } from '../types/server-options.type';
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
    Polka()
        // attach the middleware.
        .use(...middleware)

        // register static assets.
        .use(`/public`, serve(join(__dirname, 'assets')))

        // set up the server to be used for SSR.
        .get('*', async (req, res) => {
            const options: ServerOptions = {
              debug: config.env === "development",
              port: config.port
            };
            
            if (config.ssr === 'stream') {
                // set up streaming ssr.
                renderToStream(() => <App url={req.url} serverOptions={options} />).pipe(res);
            }
            else {
                // the SSR configuration is set to either synchonous or asynchonous SSR.
                try {
                    let page: string;

                    if (config.ssr === 'async') {
                        // set up async ssr.
                        page = await renderToStringAsync(() => (
                          <App
                            url={req.url}
                            serverOptions={options}
                          />
                        ));
                    }
                    else {
                        // set up standard ssr.
                        page = renderToString(() => (
                          <App
                            url={req.url}
                            serverOptions={options}
                          />
                        ));
                    }
                    res.status(200).send(page);
                }
                catch(e) {
                    console.log((e as Error).message);
                    res.status(500).send('Server Error');
                }
            }
        })

        // start the server.
        .listen(config.port, () => {
            console.log(`[${DateTime.Now().toString()}]: Application successfully running on ${config.host}:${config.port}`);
        });
}