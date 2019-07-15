import { Router } from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import userRouter from './userRoute';
import propertyRouter from './propertyRoute';
import PropertyValidator from '../middlewares/propertyValidator';
import { isSignedIn } from '../middlewares/authorization';


const router = Router();

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);

const { validateParam } = PropertyValidator;

// Used for routes that start with /api/v1
// /api/v1 is already prepended to the route

router.all('/', (req, res) => {
  res.status(200).send({ status: 'success', data: 'Welcome to Property Pro home page' });
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/auth', userRouter);

router.use('/property/:propertyId', validateParam);
router.use('/property', isSignedIn, propertyRouter);

router.all('*', (req, res) => {
  res.status(404).send('No such route');
});

export default router;
