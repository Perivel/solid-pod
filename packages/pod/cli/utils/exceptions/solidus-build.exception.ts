import { SolidusException } from './solidus.exception';

export class SolidusBuildException extends SolidusException {
    constructor(message: string = "Build failed") {
        super(message);
    }
}