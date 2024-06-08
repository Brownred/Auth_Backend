import jwt from 'jsonwebtoken'



export const token = (email: Object) => {
    jwt.sign(email, process.env.JWT_SECRET, {expiresIn: '3600s'})
}