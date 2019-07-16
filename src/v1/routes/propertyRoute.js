import { Router } from 'express';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import { isAdmin } from '../middlewares/authorization';

const propertyRouter = Router();

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

const { validateCreateProperty, validateUpdateProperty, validateParam } = PropertyValidator;
const {
  createProperty,
  updateProperty,
  markAsSold,
  deleteProperty,
  getAllProperty,
  getSpecificProperty,
} = propertyController;


// These routes are only available to agents
propertyRouter.post('/', isAdmin, createProperty);
propertyRouter.patch('/:propertyId', isAdmin, validateUpdateProperty, updateProperty);
propertyRouter.patch('/:propertyId/sold', isAdmin, markAsSold);
propertyRouter.delete('/:propertyId', isAdmin, deleteProperty);

// propertyRouter.post('/', isAdmin, validateCreateProperty, createProperty);
// propertyRouter.patch('/:propertyId', validateParam, isAdmin, validateUpdateProperty, updateProperty);
// propertyRouter.patch('/:propertyId/sold', validateParam, isAdmin, markAsSold);
// propertyRouter.delete('/:propertyId', validateParam, isAdmin, deleteProperty);


// These routes are only available to a logged in users(that is both an agent and a user)
propertyRouter.get('/:propertyId', getSpecificProperty);
propertyRouter.get('/', getAllProperty);

// propertyRouter.get('/:propertyId', getSpecificProperty);
// propertyRouter.get('/', getAllProperty);

export default propertyRouter;
