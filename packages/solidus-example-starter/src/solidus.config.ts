import { Configuration } from 'solidus';

export default <Configuration> {
    env: 'production',
    host: 'localhost',
    port: 5000,
    static: './src/assets',
    ssr: 'sync'
}