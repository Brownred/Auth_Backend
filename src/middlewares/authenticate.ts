import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken'




/*************************************************************************************************/



// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string;
    }
  }
}


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

    jwt.verify(token as string, process.env.JWT_SECRET as Secret, (error, user) => {
        if (error) {
            return res.status(403).json({message: 'invalid token'})
        }
        
        req.user = user
        next()

    })
}