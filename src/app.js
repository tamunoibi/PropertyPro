import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import debug from 'debug';
import morgan from 'morgan';
import expressValidator from 'express-validator';

import router from './v1/routes';


// Middleware
const app = express();
const debugIt = debug('dev:app');
const port = process.env.PORT || 5000;
app.use(cors());
app.options('*', cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


// Routes handler
app.all('/', (req, res) => {
  res.redirect('/api/v1');
});
app.use('/api/v1', router);


app.listen(port, () => {
  debugIt(`App started at port ${port}`);
});

export default app;
