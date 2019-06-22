import validate from 'validate.js';
import Helpers from '../helpers/Helpers';
import authentication from '../helpers/Authenticator';

import userModel from '../models/userModel.js';

const { extractErrors } = Helpers;
const { getUser } = userModel;
const { decode } = authentication;

export default class AuthValidator {
  /**
   * validates user sign up inputs
   * @param {object} req - The request entered by the user.
   * @param {object} res - The response sent to the user is error if validation fails
   * @param {callback} next - The next middleware is called if validation is successful
   */
  static validateSignUp(req, res, next) {
    req
      .check('firstName', 'First Name is required')
      .notEmpty()
      .trim();
    req
      .check('lastName', 'Last Name is required')
      .notEmpty()
      .trim();
    req
      .check('phone', 'The phone number is required')
      .notEmpty()
      .trim()
      .isLength({ min: 11 })
      .withMessage('Enter a valid phone number');
    req
      .check('password', 'Password is required')
      .notEmpty()
      .trim()
      .isLength({ min: 6 })
      .withMessage('password cannot be less then 6 characters');
    req
      .check('email', 'Email is required')
      .notEmpty()
      .isEmail()
      .withMessage('Invalid email');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
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
        .json({ status: 409, error: 'User already exists' });
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
        status: 400,
        errors: extractErrors(errors),
      });
    }
    return next();
  }

  static checkToken(req, res, next) {
    const token = req.body.token || req.headers.token;

    try {
      if (validate.isEmpty(token)) {
        return res.status(401).send({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const decodedToken = decode(token);
      if (decodedToken.id) {
        return next();
      }
    } catch (err) {
      return res.status(401).send({
        status: 401,
        error: 'Unauthorized cos not match',
      });
    }

    return next();
  }

  static isAdmin(req, res, next) {
    const token = req.body.token || req.headers.token;
    try {
      if (validate.isEmpty(token)) {
        return res.status(401).send({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const decodedToken = decode(token);

      if (decodedToken.isAdmin) {
        return next();
      }
    } catch (err) {
      return res.status(401).send({
        status: 401,
        error: 'Unauthorized',
      });
    }

    return next();
  }

  static isStaff(req, res, next) {
    const token = req.body.token || req.headers.token;
    try {
      if (validate.isEmpty(token)) {
        return res.status(401).send({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const decodedToken = decode(token);
      console.log('TCL: AuthValidator -> isStaff -> token', decodedToken);

      if (decodedToken.type === 'cashier') {
        return next();
      }
    } catch (err) {
      return res.status(401).send({
        status: 401,
        error: 'Unauthorized',
      });
    }

    return next();
  }
}
