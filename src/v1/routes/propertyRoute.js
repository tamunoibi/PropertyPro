import { Router } from 'express';
import { cloudinaryUpload } from '../config/cloudinaryConfig';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import { isAdmin } from '../middlewares/authorization';

const propertyRouter = Router();

// Used for routs that start with /api/v1
// /api/v1/property is already prepended to the route

// const { validateCreateProperty, validateUpdateProperty } = PropertyValidator;
const { validateCreateProperty, validateUpdateProperty } = PropertyValidator;
const {
  createProperty,
  updateProperty,
  markAsSold,
  deleteProperty,
  getAllProperty,
  getSpecificProperty,
  propertyImage,
} = propertyController;


// These routes are only available to agents
propertyRouter.post('/', isAdmin, validateCreateProperty, createProperty);
propertyRouter.patch('/:propertyId', isAdmin, validateUpdateProperty, updateProperty);
propertyRouter.patch('/:propertyId/sold', isAdmin, markAsSold);
propertyRouter.delete('/:propertyId', isAdmin, deleteProperty);


// These routes are only available to a logged in users(that is both an agent and a user)
propertyRouter.get('/:propertyId', getSpecificProperty);
propertyRouter.get('/', getAllProperty);

export default propertyRouter;
