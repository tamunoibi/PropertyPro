import { Router } from 'express';
import userRouter from '../v1/routes/userRoute';
import propertyRouter from '../v1/routes/propertyRoute';
import AuthValidator from '../v1/middlewares/authValidator';


const router = Router();

const { isSignin } = AuthValidator;

// Used for routes that start with /api/v1
// /api/v1 is already prepended to the route

router.all('/', (req, res) => {
  res.status(200).send('Welcome to Property Pro home page');
});

router.use('/auth', userRouter);

router.use('/property', isSignin, propertyRouter);

router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
