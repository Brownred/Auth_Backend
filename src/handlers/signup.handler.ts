import { NextFunction, Request, Response } from "express";
import { signUpDetails } from "../utils/types";



// file imports
import { User } from "../db/schema/user.schema";
import { errorHandler } from "./error.handler";



/***************************************************************************************************/




export const signUp  = async (req: Request, res: Response, next: NextFunction) => {
    /** 
     * check if user exists
     * throw an error if exists (email: email already in use)
     * proceed to write to db in new user 
     * catch other errors
     */

    // retrieve user details from request body
    const { name, email, password, dob, gender, country }: signUpDetails = req.body


    try {

        //Check if the email already exists
        const exists = await User.findOne({ email }).catch((err) => console.error(err))
        if (exists) {
            return next(errorHandler(401, 'email already in use'))
        }

        // hash password for safety
        const hashedPassword = bcryptjs.hash(password, 8)

        // write user details to database
        new User({name, email, hashedPassword, dob, gender, country}).save().then(() => console.log('User Created')).catch((err) => console.error(err))

    } catch (error) {
        console.error(error)
    }

}

export const logIn  = async (req: Request, res: Response) => {}