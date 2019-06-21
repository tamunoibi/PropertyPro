import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Banka home page');
});

router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
