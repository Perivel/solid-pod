import typescriptPlugin from '@rollup/plugin-typescript';
import hashbangPlugin from 'rollup-plugin-hashbang'
import { resolve } from 'path';
import jsonPlugin from '@rollup/plugin-json';

export default {
    input: resolve(__dirname, 'index.ts'),
    output: {
        file: "./dist/index.js",
        format: "cjs"
    },
    plugins: [
        typescriptPlugin(), 
        hashbangPlugin(), 
        jsonPlugin()
    ],
    external: [
        "@swindle/core",
        "@swindle/os",
        "chalk",
        "clipanion",
        "solidus"
    ]
}