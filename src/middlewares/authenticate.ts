import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'



/*************************************************************************************************/




export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    /**
     * retrive the token from cookie header
     * Verify the token
     * verify user credential within the token
     * call next
     */

    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({message: 'Not Authorized'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({message: 'invalid token'})
        }
        /** If i should check the db or not */
        req.user = user
        next()

    })
}