import { Configuration } from '@solidusjs/core';

export default <Configuration> {
    env: 'production',
    host: 'localhost',
    port: 5000,
    static: './src/assets',
    ssr: 'async'
}