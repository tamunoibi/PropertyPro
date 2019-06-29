import express from 'express';
import AuthValidator from '../middlewares/authValidator';
import userController from '../controllers/userController';

const { validateSignUp, userExists, validateLogin } = AuthValidator;
const { createAccount, signinUser } = userController;

const userRouter = express.Router();

userRouter.post('/signup', validateSignUp, userExists, createAccount);
userRouter.post('/signin', validateLogin, signinUser);

export default userRouter;
