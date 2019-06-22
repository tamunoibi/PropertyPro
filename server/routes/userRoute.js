import express from 'express';
import AuthValidator from '../middlewares/authValidator';
import userController from '../controllers/userController';

const { validateSignUp, userExists, validateLogin } = AuthValidator;
const { createAccount, loginUser } = userController;

const userRouter = express.Router();

userRouter.post('/signup', validateSignUp, userExists, createAccount);
userRouter.post('/login', validateLogin, loginUser);

export default userRouter;
