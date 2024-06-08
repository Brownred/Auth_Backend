

// File imports
import { CustomError } from "../handlers/error.handler";



/*************************************************************************************************/




export interface signUpDetails {
    name: string;
    email: string;
    password: string;
    dob: Date;
    gender: 'Male' | 'Female';
    country?: string;
}

export interface LogInDetails {
    email: string;
    password: string;
}

export interface ErrorHandler {
    errorHandler: (statusCode: number, message: string) => CustomError
}