import express from 'express';
import userRouter from './userRoute';
import propertyRouter from './propertyRoute';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Property Pro home page');
});
router.use('/auth', userRouter);
router.use('/property', propertyRouter);
router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
