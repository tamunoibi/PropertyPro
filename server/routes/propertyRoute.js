import express from 'express';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import AuthValidator from '../middlewares/authValidator';

const propertyRouter = express.Router();

const { validateCreateProperty, validateUpdateProperty, validateParam } = PropertyValidator;
const { createProperty, updateProperty, markAsSold } = propertyController;
const { isOwner } = AuthValidator;

propertyRouter.post('/', validateCreateProperty, isOwner, createProperty);
propertyRouter.patch('/:propertyId', validateParam, validateUpdateProperty, isOwner, updateProperty);
propertyRouter.patch('/:propertyId/sold', validateParam, isOwner, markAsSold);

export default propertyRouter;
