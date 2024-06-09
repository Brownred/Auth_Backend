import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'



// file imports
import authRouter from './routers/auth.router'
import Connect from './db/connection'
import userRouter from './routers/user.router'


/***************************************************************************************************/



const app = express()

// Top Level middlewares
app.use(cors())
app.use(cookieParser())  // Help us work with cookies
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// database connection
Connect

// Routes
app.use('/api/auth', authRouter) 
app.use('/api/user', userRouter)

// Server
app.listen(4000, () => {
    console.log('server listening on http://localhost:4000')
})  




