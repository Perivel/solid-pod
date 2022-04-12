import { Configuration } from '@solidusjs/core';

export default <Configuration> {
    title: "SolidusJS",
    charset: 'utf-8',
    lang: 'en',
    env: 'production',
    host: 'localhost',
    port: 5000,
    static: './src/assets',
    ssr: 'async',
    style: 'index.css'
}