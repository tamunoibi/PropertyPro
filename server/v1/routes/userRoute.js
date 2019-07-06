import { Router } from 'express';
import AuthValidator from '../middlewares/authValidator';
import userController from '../controllers/userController';

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

const { validateSignUp, userExists, validateLogin } = AuthValidator;
const { createAccount, signinUser } = userController;

const userRouter = Router();

userRouter.post('/signup', validateSignUp, userExists, createAccount);
userRouter.post('/signin', validateLogin, signinUser);

export default userRouter;
