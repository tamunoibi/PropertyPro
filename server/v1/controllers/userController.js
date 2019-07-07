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
      const { id, is_admin } = user;
      const token = await generateToken({ id, is_admin });
      const data = Object.assign({ token }, user);

      return res.status(201).json({
        status: 'success',
        data,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error Unable to signin new user',
      });
    }
  }

  static async signinUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await getUser(email);

      if (!user) {
        return res
          .status(401)
          .send({ status: 'error', error: 'Invalid username or password' });
      }

      if (passwordHash.verify(password.trim(), user.password)) {
        const { id, is_admin } = user;

        const token = await generateToken({ id, is_admin });

        const { first_name, last_name } = user;
        const userDetails = {
          id,
          first_name,
          last_name,
          email,
        };
        const data = Object.assign({ token }, userDetails);

        return res.status(200).json({
          status: 'success',
          data,
        });
      }
      return res
        .status(401)
        .send({ status: 'error', error: 'Invalid username or password' });
    } catch (err) {
      return res
        .status(500)
        .send({ status: 'error', error: 'Internal server error' });
    }
  }
}
