import express from 'express';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import AuthValidator from '../middlewares/authValidator';

const propertyRouter = express.Router();

const { validateCreateProperty } = PropertyValidator;
const { createProperty } = propertyController;
const { isAdmin } = AuthValidator;

propertyRouter.post('/', validateCreateProperty, isAdmin, createProperty);

export default propertyRouter;
