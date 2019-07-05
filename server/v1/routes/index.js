//  TODO: change to destructuring
// import { Router } from 'express';
import express from 'express';
import userRouter from './userRoute';
import propertyRouter from './propertyRoute';

// const router = Router();
const router = express.Router();

// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

router.all('/', (req, res) => {
  res.status(200).send('Welcome to Property Pro home page');
});
router.use('/auth', userRouter);
router.use('/property', propertyRouter);
router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
