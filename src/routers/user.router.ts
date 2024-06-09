import { Router } from "express";



// file imports 
import { getUser } from '../handlers/getUser.handler';
import { authenticate } from "../middlewares/authenticate";



/**************************************************************************************************/




const userRouter = Router();


// Router
userRouter.get('/getUser', authenticate, getUser)



export default userRouter;