import { Request, Response } from "express";
import { signUpDetails } from "../utils/types";

/***************************************************************************************************/



export const signUp  = async (req: Request, res: Response) => {
    /** 
     * check if user exists
     * throw an error if exists (email: email already in use)
     * proceed to write to db in new user 
     * catch other errors
     */

    const { fullName, email, password, dob, gneder, Country }: signUpDetails = req.body

    try {

        const exists = await User.findOne({ email })
        if (exists) {
            return next(errorHandler(401, 'email already in use'))
        }

        const hashedPassword = bcryptjs.hash(password, 8)


    } catch (error) {
        
    }

}

export const logIn  = async (req: Request, res: Response) => {}