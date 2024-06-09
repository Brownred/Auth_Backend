import jwt, { Secret } from 'jsonwebtoken';



export const token = (email: string) => {
    return jwt.sign({email}, process.env.JWT_SECRET as Secret, {expiresIn: '3600s'})
}