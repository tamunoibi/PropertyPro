import passwordHash from 'password-hash';

import Authenticator from '../helpers/Authenticator';
import userModel from '../models/userModel';

const { generateToken } = Authenticator;
const { getUser } = userModel;

const { create } = userModel;
export default class UserController {
  static async createAccount(req, res) {
    let user;

    try {
      user = create(req, res);
      const { id, isAdmin, type } = user;
      const token = await generateToken({ id, isAdmin, type });
      const data = Object.assign({ token }, user);

      return res.status(201).json({
        status: 201,
        data,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error Unable to login new user',
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await getUser(email);
      if (!user) {
        return res
          .status(401)
          .send({ status: 401, error: 'Invalid username or password' });
      }

      if (passwordHash.verify(password.trim(), user.password)) {
        const { id, isAdmin, type } = user;
        const token = await generateToken({ id, isAdmin, type });

        const data = Object.assign({ token }, user);

        return res.status(201).json({
          status: 201,
          data,
        });
      }
      return res
        .status(401)
        .send({ status: 401, error: 'Invalid username or password' });
    } catch (err) {
      return res
        .status(500)
        .send({ status: 500, error: 'Internal server error' });
    }
  }
}
