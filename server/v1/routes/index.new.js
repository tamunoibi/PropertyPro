//  TODO: change to destructuring
// import { Router } from 'express';
import express from 'express';
import authRouter from './userRoute';
import agentRouter from './agentRoute';
import userRouter from './userRoute';

// const router = Router();
const router = express.Router();

// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

router.all('/', (req, res) => {
  res.status(200).send('Welcome to Property Pro home page');
});
router.use('/auth', authRouter);
router.use('/property', agentRouter);
router.use('/property', userRouter);
router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
