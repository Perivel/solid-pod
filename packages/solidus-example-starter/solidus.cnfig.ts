import { Configuration } from 'solidus';

const configuration: Configuration = {
    host: 'localhost',
    port: 3000,
    env: 'development',
    ssr: 'sync',
    middleware: [],
    static: 'src/assets'
}

export default configuration;