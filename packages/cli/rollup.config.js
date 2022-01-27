import typescriptPlugin from '@rollup/plugin-typescript';
import executablePlugin from 'rollup-plugin-executable';
import { resolve } from 'path';
import json from '@rollup/plugin-json';

export default {
    input: resolve(__dirname, 'index.ts'),
    output: {
        file: "./dist/index.js",
        format: "cjs"
    },
    plugins: [typescriptPlugin(), executablePlugin(), json()],
    external: [
        "@swindle/core",
        "@swindle/os",
        "chalk",
        "clipanion",
        "solidus"
    ]
}