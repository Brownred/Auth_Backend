import { Router } from "express";

/** file imports */
import { logIn, signUp } from "../handlers/signup.handler";

/***************************************************************************************************/



const authRouter = Router();

// Router
authRouter.post('/signup', signUp)
authRouter.post('/login', logIn)

// 3rd parties
// google
// github
// LinkedIn
// Apple
// facebook

export default authRouter;