import { BaseException } from '@chaperone/util';

export class SolidusException extends BaseException {
    constructor(message: string = "Something went wrong.") {
        super(message);
    }
}