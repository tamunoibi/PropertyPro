import { Router } from 'express';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import AuthValidator from '../middlewares/authValidator';

const propertyRouter = Router();

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

const {
  validateCreateProperty, validateUpdateProperty, validateParam,
} = PropertyValidator;
const {
  createProperty, updateProperty, markAsSold, deleteProperty, getAllProperty, getSpecificProperty,
} = propertyController;
const { isAdmin } = AuthValidator;


// These routes are only available to agents
propertyRouter.post('/', validateCreateProperty, isAdmin, createProperty);
// TODO:
//  .patch() does not modify the property the property
// mark as sold

propertyRouter.patch('/:propertyId', validateParam, validateUpdateProperty, isAdmin, updateProperty);
propertyRouter.patch('/:propertyId/sold', validateParam, isAdmin, markAsSold);
propertyRouter.delete('/:propertyId', validateParam, isAdmin, deleteProperty);

// These routes are only available to a logged in users (that is both an agent and a user )
propertyRouter.get('/', getAllProperty);
propertyRouter.get('/:propertyId', getSpecificProperty);

export default propertyRouter;
