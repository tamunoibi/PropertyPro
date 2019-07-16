import helpers from '../helpers/Helpers';

const { extractErrors } = helpers;


export default class PropertyValidator {
  // static validateCreateProperty(req, res, next) {
  //   req
  //     .check('price', 'price is required')
  //     .notEmpty()
  //     .trim()
  //     .isNumeric()
  //     .withMessage('price must be a number');
  //   req
  //     .check('state', 'state is required')
  //     .notEmpty()
  //     .trim()
  //     .isLength({ min: 2 })
  //     .withMessage('Enter a valid city');
  //   req
  //     .check('city', 'city is required')
  //     .notEmpty()
  //     .trim()
  //     .isLength({ min: 2 })
  //     .withMessage('Enter a valid city');
  //   req
  //     .check('address', 'The address is required')
  //     .notEmpty()
  //     .trim()
  //     .isLength({ min: 11 })
  //     .withMessage('Enter a valid address');
  //   req
  //     .check('type', 'type is required')
  //     .notEmpty()
  //     .trim()
  //     .isLength({ min: 6 })
  //     .withMessage('type cannot be less then 6 characters');
  //   req
  //     .check('image_url', 'image_url is required')
  //     .notEmpty()
  //     .trim()
  //     .isURL()
  //     .withMessage('Invalid image_url');

  //   const errors = req.validationErrors();
  //   if (errors) {
  //     return res.status(400).json({
  //       status: 'error',
  //       error: extractErrors(errors),
  //     });
  //   }
  //   return next();
  // }

  static validateProperty(req, res, next) {
    const {
      type, price, state, city, address, image_url,
    } = req.body;

    if (!type && !price && !state && !city && !address && !image_url) {
      return res.status(400).json({
        status: 'error',
        error: 'You must provide at least one field to be updated',
      });
    }
    if (price) {
      req
        .check('price', 'price is required')
        .notEmpty()
        .trim()
        .isNumeric()
        .withMessage('price must be a number');
    }
    if (state) {
      req
        .check('state', 'state is required')
        .notEmpty()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Enter a valid city');
    }
    if (city) {
      req
        .check('city', 'city is required')
        .notEmpty()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Enter a valid city');
    }
    if (address) {
      req
        .check('address', 'The address is required')
        .notEmpty()
        .trim()
        .isLength({ min: 11 })
        .withMessage('Enter a valid address');
    }
    if (type) {
      req
        .check('type', 'type is required')
        .notEmpty()
        .trim()
        .isLength({ min: 6 })
        .withMessage('type cannot be less then 6 characters');
    }
    if (image_url) {
      req
        .check('image_url', 'image_url is required')
        .notEmpty()
        .trim()
        .isURL()
        .withMessage('Invalid image_url');
    }
    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({
        status: 'error',
        error: extractErrors(errors),
      });
    }
    return next();
  }

  static validateParam(req, res, next) {
    req
      .checkParams('propertyId', 'The property ID must be a number')
      .notEmpty()
      .isInt();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 'error',
        error: helpers.extractErrors(errors),
      });
    }
    return next();
  }
}
