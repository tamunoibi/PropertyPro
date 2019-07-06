import { Router } from 'express';
import PropertyValidator from '../v1/middlewares/propertyValidator';
import propertyController from '../v1/controllers/propertyController';
import AuthValidator from '../v1/middlewares/authValidator';

const propertyRouter = Router();

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

const {
  validateCreateProperty, validateUpdateProperty, validateParam,
} = PropertyValidator;
const {
  createProperty, updateProperty, markAsSold, deleteProperty, getAllProperty, getSpecificProperty,
} = propertyController;
const { isOwner, checkToken, isSignin } = AuthValidator;


// These routes are only available to agents
propertyRouter.post('/', validateCreateProperty, isSignin, (req, res) => {
  res.send('hi');
});
propertyRouter.patch('/:propertyId', validateParam, validateUpdateProperty, isOwner, updateProperty);
propertyRouter.patch('/:propertyId/sold', validateParam, isOwner, markAsSold);
propertyRouter.delete('/:propertyId', validateParam, isOwner, deleteProperty);

// These routes are only available to a logged in users (that is both an agent and a user )
propertyRouter.get('/', checkToken, getAllProperty);
propertyRouter.get('/:propertyId', checkToken, getSpecificProperty);

export default propertyRouter;
