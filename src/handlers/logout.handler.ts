import { Request, Response } from "express";




export const logout = (req: Request, res: Response) => {
    res.clearCookie('accessToken').status(200).json({message: 'Signout success'})
}