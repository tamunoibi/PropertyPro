import validate from 'validate.js';
import Helpers from '../helpers/Helpers';
import authentication from '../helpers/Authenticator';
import userModel from '../models/userModel';
import dummyData from '../models/dummyData';

const { extractErrors } = Helpers;
const { getUser } = userModel;
const { decode } = authentication;
const { properties } = dummyData;


export default class AuthValidator {
  /**
   * validates user sign up inputs
   * @param {object} req - The request entered by the user.
   * @param {object} res - The response sent to the user is error if validation fails
   * @param {callback} next - The next middleware is called if validation is successful
   */
  static validateSignUp(req, res, next) {
    req
      .check('email', 'Email is required')
      .notEmpty()
      .isEmail()
      .withMessage('Invalid email');
    req
      .check('first_name', 'First Name is required')
      .notEmpty()
      .trim();
    req
      .check('last_name', 'Last Name is required')
      .notEmpty()
      .trim();
    req
      .check('password', 'Password is required')
      .notEmpty()
      .trim()
      .isLength({ min: 6 })
      .withMessage('password cannot be less then 6 characters');
    req
      .check('phoneNumber', 'The phone number is required')
      .notEmpty()
      .trim()
      .isLength({ min: 11 })
      .withMessage('Enter a valid phone number');
    req
      .check('address', 'Address is required')
      .notEmpty()
      .trim()
      .isLength({ min: 11 })
      .withMessage('Invalid address');
    req
      .check('is_admin', 'The User type is required')
      .notEmpty()
      .trim()
      .isBoolean()
      .withMessage('Invalid User type');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 'error',
        error: extractErrors(errors),
      });
    }
    return next();
  }

  static async userExists(req, res, next) {
    const { email } = req.body;
    const user = await getUser(email);
    if (user) {
      return res
        .status(409)
        .json({ status: 'error', error: 'User already exists' });
    }
    return next();
  }

  static validateLogin(req, res, next) {
    req
      .check('email', 'Email is required')
      .notEmpty()
      .isEmail()
      .trim()
      .withMessage('Invalid email');
    req
      .check('password', 'Password is required')
      .notEmpty()
      .trim();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 'error',
        errors: extractErrors(errors),
      });
    }
    return next();
  }

  static isOwner(req, res, next) {
    const token = req.body.token || req.headers.token;
    const { propertyId } = req.params;


    try {
      if (validate.isEmpty(token)) {
        return res.status(401).send({
          status: 'error',
          error: 'Unauthorized',
        });
      }
      const decodedToken = decode(token);
      const { id, is_admin } = decodedToken;

      const property = properties.find(EachProperty => EachProperty.id === parseInt(propertyId, 10));

      if (property.owner === id && is_admin) {
        return next();
      }
    } catch (err) {
      return res.status(401).send({
        status: 'error',
        error: 'Unauthorized',
      });
    }

    return res.status(401).send({
      status: 'error',
      error: 'Unauthorized',
    });
  }
}
