import { runApp, Middleware } from '@solidus-js/core';
import App from './App';

const logMiddleware: Middleware = async (req, res, next) => {
    console.log(`Received request from ${req.socket.remoteAddress}`);
    next();
}

runApp(App, {
    middleware: [logMiddleware],
});