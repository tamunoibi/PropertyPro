import helpers from '../helpers/Helpers';
// import { cloudinaryDelete } from '../config/cloudinaryConfig';

const { extractErrors } = helpers;

export default class PropertyValidator {
  static validateCreateProperty(req, res, next) {
    const { is_admin } = res.data;
    if (!is_admin) return res.status(401).send({ status: 'error', error: 'Unauthorized' });
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
        status: 'error',
        error: extractErrors(errors),
      });
    }
    return next();
  }

  static validateUpdateProperty(req, res, next) {
    // req.body.notEmpty().withMessage('The request body can not be empty');
    if (req.body.price) {
      req
        .check('price', 'price is required')
        .notEmpty()
        .trim()
        .isNumeric()
        .withMessage('price must be a number');
    }
    if (req.body.state) {
      req
        .check('state', 'state is required')
        .notEmpty()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Enter a valid city');
    }
    if (req.body.city) {
      req
        .check('city', 'city is required')
        .notEmpty()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Enter a valid city');
    }
    if (req.body.address) {
      req
        .check('address', 'The address is required')
        .notEmpty()
        .trim()
        .isLength({ min: 11 })
        .withMessage('Enter a valid address');
    }
    if (req.body.type) {
      req
        .check('type', 'type is required')
        .notEmpty()
        .trim()
        .isLength({ min: 6 })
        .withMessage('type cannot be less then 6 characters');
    }
    if (req.body.image_url) {
      req
        .check('image_url', 'image_url is required')
        .notEmpty()
        .trim()
        .isURL()
        .withMessage('Invalid image_url');
    }

    const errors = req.validationErrors();
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'The request Body cannot be empty',
      });
    }

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
        status: 400,
        errors: helpers.extractErrors(errors),
      });
    }
    return next();
  }

  // static validateImage(req, res, next) {
  //   const { files, file, typeError } = req;
  //   const images = files || file;
  //   if (typeError) {
  //     images.forEach(image => cloudinaryDelete(image.public_id));
  //     return res.status(403).send({ error: typeError });
  //   }
  //   return next();
  // }
}
