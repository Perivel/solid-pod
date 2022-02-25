import { Configuration } from 'solidusjs';

export default <Configuration> {
    env: 'production',
    host: 'localhost',
    port: 5000,
    static: './src/assets',
    ssr: 'sync'
}