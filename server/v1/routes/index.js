import { Router } from 'express';
import userRouter from './userRoute';
import propertyRouter from './propertyRoute';
import AuthValidator from '../middlewares/authValidator';


const router = Router();

const { isSignin } = AuthValidator;

// Used for routes that start with /api/v1
// /api/v1 is already prepended to the route

router.all('/', (req, res) => {
  console.log(v1());
  res.status(200).send('Welcome to Property Pro home page');
});

router.use('/auth', userRouter);

router.use('/property', isSignin, propertyRouter);

router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
