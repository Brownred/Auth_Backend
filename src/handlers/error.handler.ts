// File imports
import { ErrorHandler } from '../utils/types';



/*************************************************************************************************/


// Handle DB Errors
export const handleErrors = (err: any) => {
    // send back json response of the error
    
    let errors: { [key: string]: string } = { email: '', password: '', name: '', dob: '' }

    // duplicate email
    if (err.code === 11000) {
        errors.email = 'email already in use'
        
    }

    // Purse the error message and populate the errors object
    if (err.name.includes('ValidationError')) {
        Object.values(err.errors).forEach((value: unknown) => {
            const properties = (value as { properties: any }).properties;
            errors[properties.path] = properties.message
        })
    }

    // Function to filter out keys with empty values
    function filterErrors(errors: { [key: string]: string }): { [key: string]: string } {
        const filteredErrors: { [key: string]: string } = {};
        Object.keys(errors).forEach(key => {
            if (errors[key] !== '') {
                filteredErrors[key] = errors[key];
            }
        });
        return filteredErrors;
    }

    return filterErrors(errors);

}

export class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number = 500, message?: string) {
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