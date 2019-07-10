import { Router } from 'express';
import AuthValidator from '../v1/middlewares/authValidator';
import userController from '../v1/controllers/userController';

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

const { validateSignUp, validateLogin } = AuthValidator;
const { createAccount, signinUser } = userController;

const userRouter = Router();

userRouter.post('/signup', validateSignUp, createAccount);
userRouter.post('/signin', validateLogin, signinUser);

export default userRouter;
