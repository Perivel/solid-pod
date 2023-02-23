import { runApp, Middleware } from 'solid-pod';
import App from './App';

const logMiddleware: Middleware = async (req, res) => {
    console.log(`Received request from ${req.socket.remoteAddress}`);
}

runApp(App, {
    middleware: [logMiddleware],
});