import { Request, Response } from "express"
import bcrypt from 'bcrypt';



// File imports
import { LogInDetails } from "../utils/types"
import { User } from "../db/schema/user.schema"
import { CustomError, errorHandler, handleErrors } from "./error.handler"
import { token } from "../auth/jwt";



/*************************************************************************************************/




export const logIn  = async (req: Request, res: Response) => {

    /**
     * get the user details from the request
     * check if they do exists
     * verify cridentials using bcrypt
     * give jwt if authenticated
     * handle errors
     */

    
    try {
        
        const {email, password}: LogInDetails = req.body

        // Check user existence in db
        const exists = await User.findOne({email})
        if (!exists) {
            return res.status(401).json({credentials: "Email and password does not match"})
        }
    
        // validate password
        const validPassword = await bcrypt.compare(password, exists.password)
        if (!validPassword) {
            return res.status(401).json({credentials: "Email and password does not match"})
        }
    
        // retrieve the user data to be sent back to user for other frontend stuff. The password is removed for safety
        const { password: hashedPassword, ...rest } = exists.toObject();
    
        // give jwt and store in cookie
        res.cookie('accessToken', token(email), {httpOnly: true, maxAge: 3600000}).status(200).json({message: 'Logged in successfully', ...rest})

    } catch (error) {
        
        res.status(401).json(handleErrors(error))

    }

}