import { BaseException } from '@swindle/core';

export class SolidusException extends BaseException {
    constructor(message: string = "Something went wrong.") {
        super(message);
    }
}