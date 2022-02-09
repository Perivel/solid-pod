import { Path, FileSystem, FileOpenFlag } from '@swindle/filesystem';
import { Process } from '@swindle/os';

const defaultConfig: object = {
    compilerOptions: {
        strict: true,
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "node",
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        jsx: "preserve",
        jsxImportSource: "solid-js"
  }
}

/**
 * loadTsconfig()
 * 
 * loads the tsconfig file.
 * @param root the project root directory.
 * @returns Tsconfig options.
 */

export const loadTsconfig = async (root: Path = Process.Cwd()): Promise<object> => {
    const path = Path.FromSegments(root, 'tsconfig.json');
    let config = defaultConfig;

    if (await FileSystem.Contains(path)) {
        const file = await FileSystem.Open(path, FileOpenFlag.READ);
        const data = await file.readAll();
        await file.close();
        config = JSON.parse(data);
    }

    return config;
}