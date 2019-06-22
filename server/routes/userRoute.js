import express from 'express';
import AuthValidator from '../middlewares/authValidator';
import userController from '../controllers/userController';

const { validateSignUp, userExists } = AuthValidator;
const { createAccount } = userController;

const userRouter = express.Router();

userRouter.post('/signup', validateSignUp, userExists, createAccount);

export default userRouter;
