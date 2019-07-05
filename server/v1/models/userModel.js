import passwordHash from 'password-hash';
// import moment from 'moment';
import dummyData from './dummyData';

const { users } = dummyData;

export default class UserModel {
  static getUser(email) {
    const user = users.find(EachUser => EachUser.email === email);
    return user;
  }

  static create(req, res) {
    const {
      email,
      first_name,
      last_name,
      password,
      phoneNumber,
      address,
      is_admin,
    } = req.body;
    const hashedpassword = passwordHash.generate(password);

    const user = {
      id: users.length + 1,
      email,
      first_name,
      last_name,
      phoneNumber,
      address,
      password: hashedpassword,
      is_admin,
    };

    try {
      users.push(user);
      const { id } = user;
      const userDetails = {
        id,
        first_name,
        last_name,
        email,
      };
      return userDetails;
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, message: 'Internal Server error' });
    }
  }
}
