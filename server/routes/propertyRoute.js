import express from 'express';
import PropertyValidator from '../middlewares/propertyValidator';
import propertyController from '../controllers/propertyController';
import AuthValidator from '../middlewares/authValidator';

const propertyRouter = express.Router();

const {
  validateCreateProperty, validateUpdateProperty, validateParam,
} = PropertyValidator;
const {
  createProperty, updateProperty, markAsSold, deleteProperty, getAllProperty,
} = propertyController;
const { isOwner, checkToken } = AuthValidator;

propertyRouter.post('/', validateCreateProperty, isOwner, createProperty);
propertyRouter.patch('/:propertyId', validateParam, validateUpdateProperty, isOwner, updateProperty);
propertyRouter.patch('/:propertyId/sold', validateParam, isOwner, markAsSold);
propertyRouter.delete('/:propertyId', validateParam, isOwner, deleteProperty);
propertyRouter.get('/', checkToken, getAllProperty);
// propertyRouter.get('/', isUser, getAllProperty);
// propertyRouter.get('/:propertyId', isUser getSpecificProperty);
propertyRouter.all('*', (req, res) => {
  res.send('I am here');
});
export default propertyRouter;
