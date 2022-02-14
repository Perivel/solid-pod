import { Configuration, Middleware } from 'solidus';

export default <Configuration> {
    env: 'production',
    host: 'localhost',
    port: 5000,
    middleware: [] as Middleware[],
    static: './src/assets',
    ssr: 'sync'
}