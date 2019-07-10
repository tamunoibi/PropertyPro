import { Router } from 'express';
import PropertyValidator from '../v1/middlewares/propertyValidator';
import propertyController from '../v1/controllers/propertyController';

const propertyRouter = Router();

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

const { validateCreateProperty, validateUpdateProperty } = PropertyValidator;
const {
  createProperty, updateProperty, markAsSold, deleteProperty, getAllProperty, getSpecificProperty,
} = propertyController;


// These routes are only available to agents
propertyRouter.post('/', validateCreateProperty, createProperty);
propertyRouter.patch('/:propertyId', validateUpdateProperty, updateProperty);
propertyRouter.patch('/:propertyId/sold', markAsSold);
// TODO: improve the validation on this route
// A request body like:
// {
//   "somedat": 2000.00
// }
// would sail through.
propertyRouter.delete('/:propertyId', deleteProperty);

// These routes are only available to a logged in users(that is both an agent and a user)
propertyRouter.get('/:propertyId', getSpecificProperty);
propertyRouter.get('/', getAllProperty);

export default propertyRouter;
