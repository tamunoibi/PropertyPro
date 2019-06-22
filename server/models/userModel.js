import passwordHash from 'password-hash';
import moment from 'moment';
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
      firstName,
      lastName,
      password,
      phone,
      isAdmin,
      type,
    } = req.body;
    const hashedpassword = passwordHash.generate(password);

    const user = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      password: hashedpassword,
      phone,
      type,
      isAdmin,
      DateCreated: moment(),
    };

    try {
      users.push(user);
      return user;
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, message: 'Internal Server error' });
    }
  }
}
