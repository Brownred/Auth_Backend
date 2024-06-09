import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './error.handler';
import { User } from '../db/schema/user.schema';
import { JwtPayload } from 'jsonwebtoken';




export const getUser = (req: Request, res: Response, next: NextFunction) => {

    /**
     * retrieve email from the token; req.user
     * retrieve the user data from db
     * send the user data back to the user
     */

    const payload = req.user as JwtPayload;
    const email = payload.email.email 


    // retrieve the user data from db
    const user = User.findOne({ email });

    if (!user) {
        return errorHandler(401, 'User not found');
    }

    res.status(200).json({user})

    
}