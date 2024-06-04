import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// file imports
import authRouter from './routers/auth.router'

/***************************************************************************************************/



const app = express()

// Top Level middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/auth', authRouter)

// Server
app.listen(8000, () => {
    console.log('server listening on http://localhost:8000')
})  




