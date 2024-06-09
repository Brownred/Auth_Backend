import { Request, Response } from "express"
import bcrypt from 'bcrypt';



// File imports
import { LogInDetails } from "../utils/types"
import { User } from "../db/schema/user.schema"
import { CustomError, errorHandler } from "./error.handler"
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

    const {email, password}: LogInDetails = req.body

    try {

        // Check user existence in db
        const exists = await User.findOne({email})
        if (!exists) {
            throw errorHandler(401, 'credentials Does not exists')
        }
    
        // validate password
        const validPassword = await bcrypt.compare(password, exists.password)
        if (!validPassword) {
            throw errorHandler(401, 'Invalid Password')
        }
    
        // retrieve the user data to be sent back to user for other frontend stuff. The password is removed for safety
        const { password: hashedPassword, ...rest } = exists.toObject();
    
        // give jwt and store in cookie
        res.cookie('accessToken', token(email), {httpOnly: true, maxAge: 3600000}).status(200).json({message: 'Logged in successfully', ...rest})

    } catch (error) {
        
        // catch any other errors
        console.error(error)
        
        res.status(500).json({message: 'Internal server error'})

    }

}