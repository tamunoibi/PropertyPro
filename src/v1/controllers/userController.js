import passwordHash from 'password-hash';

import Authenticator from '../helpers/Authenticator';
import userModel from '../models/userModel';

const { generateToken } = Authenticator;
const { getUser } = userModel;

const { create } = userModel;
export default class UserController {
  static async formatUserResponse(user) {
    const { id, is_admin: isAdmin } = user;
    const token = await generateToken({ id, isAdmin });
    const { password, ...rest } = user;
    const data = { token, ...rest };
    return data;
  }

  static async createAccount(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await getUser(email);
      if (existingUser) return res.status(409).json({ status: 'error', error: 'User already exists' });
      const {
        first_name, last_name, password, phone_number, address, is_admin,
      } = req.body;
      const userData = {
        email, first_name, last_name, password, phone_number, address, is_admin,
      };
      const user = create(userData);
      const data = await UserController.formatUserResponse(user);

      return res.status(201).json({ status: 'success', data });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to signin new user' });
    }
  }

  static async signinUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await getUser(email);

      if (!user || !passwordHash.verify(password.trim(), user.password)) {
        return res.status(401).send({ status: 'error', error: 'Invalid username or password' });
      }

      const data = await UserController.formatUserResponse(user);
      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (err) {
      return res.status(500).send({ status: 'error', error: 'Internal server error' });
    }
  }
}
