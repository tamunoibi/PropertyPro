import express from 'express';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import AuthValidator from '../middlewares/authValidator';

const propertyRouter = express.Router();

const {
  validateCreateProperty,
  validateUpdateProperty,
  validateParam,
} = PropertyValidator;
const { createProperty, updateProperty } = propertyController;
const { isAdmin } = AuthValidator;

propertyRouter.post('/', validateCreateProperty, isAdmin, createProperty);
propertyRouter.patch(
  '/:propertyId',
  validateUpdateProperty,
  isAdmin,
  validateParam,
  updateProperty,
);

export default propertyRouter;
