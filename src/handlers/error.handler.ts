// File imports
import { ErrorHandler } from '../utils/types';



/*************************************************************************************************/




export class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

/**
 * 
 * @param statusCode The error status code type
 * @param message Message of the error thrown
 * @returns The error object
 * @example 
 * // an example
 * throw errorHandler(401, 'User Does not exist')
 */
export const errorHandler = (statusCode: number, message: string) => {
    const error = new CustomError(statusCode, message);
    console.log(message);
    return error;
};