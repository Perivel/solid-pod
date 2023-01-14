import { BaseException } from '@swindle/core';

/**
 * SolidusBuildException
 * 
 * An exception indicating the Build has encountered an error.
 */

export class SolidusBuildException extends BaseException {
    constructor(message: string = "An error occured building your application.") {
        super(message); 
    }
}