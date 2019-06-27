import validate from 'validate.js';
import helpers from '../helpers/Helpers';

const { extractErrors } = helpers;

export default class PropertyValidator {
  static validateCreateProperty(req, res, next) {
    req
      .check('price', 'price is required')
      .notEmpty()
      .trim()
      .isNumeric()
      .withMessage('price must be a number');
    req
      .check('state', 'state is required')
      .notEmpty()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Enter a valid city');
    req
      .check('city', 'city is required')
      .notEmpty()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Enter a valid city');
    req
      .check('address', 'The address is required')
      .notEmpty()
      .trim()
      .isLength({ min: 11 })
      .withMessage('Enter a valid address');
    req
      .check('type', 'type is required')
      .notEmpty()
      .trim()
      .isLength({ min: 6 })
      .withMessage('type cannot be less then 6 characters');
    req
      .check('image_url', 'image_url is required')
      .notEmpty()
      .trim()
      .isURL()
      .withMessage('Invalid image_url');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 'errror',
        error: extractErrors(errors),
      });
    }
    return next();
  }

  static validateParam(req, res, next) {
    req
      .checkParams('accountId', 'The account ID must be a number')
      .notEmpty()
      .isInt();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        errors: helpers.extractErrors(errors),
      });
    }
    return next();
  }
}
