import { NextFunction, Request, Response } from "express";
import { signUpDetails } from "../utils/types";
import bcrypt from "bcrypt"



// file imports
import { User } from "../db/schema/user.schema";
import { errorHandler } from "./error.handler";
import { token } from "../auth/jwt";



/*************************************************************************************************/



// Handle DB Errors
const handleErrors = (err: any) => {
    // send back json response of the error
    
    let error = { email: '', statusCode: '' }
    console.log(err._message)
    console.log(err.message)
    if (err._message.includes('ValidationError')) {
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties)
        })
    }
}


export const signUp  = async (req: Request, res: Response) => {
    /** 
     * check if user exists
     * throw an error if exists (email: email already in use)
     * proceed to write to db in new user 
     * give jwt
     * catch other errors
     */

    // retrieve user details from request body
    const { name, email, password, dob, gender, country }: signUpDetails = req.body


    try {

        //Check if the email already exists
        const exists = await User.findOne({ email })
        if (exists) {
            throw errorHandler(401, 'email already in use')
        }

        // hash password for safety. async because they are cou intensive
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt)

        // write user details to database
        await new User({name, email, password: hashedPassword, dob, gender, country}).save().then(() => console.log('User Created'))

        // Send cookie with access token
        res.cookie('accessToken', token(email), {maxAge: 3600000, httpOnly: true}).status(201).json({message: 'User Created'})

    } catch (err: any) {
        // catch any other errors
        handleErrors(err)
        res.status(400).json({message: err})
    }

}