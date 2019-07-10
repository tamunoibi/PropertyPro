import passwordHash from 'password-hash';
import moment from 'moment';

import randomNumber from 'random-number';
import dummyData from './dummyData';

const { users } = dummyData;
const options = {
  min: 9874316514,
  max: 18743165140,
  integer: true,
};

export default class UserModel {
  static getUser(email) {
    const user = users.find(EachUser => EachUser.email === email);
    return user;
  }

  static create(data) {
    const { password, ...userDetails } = data;
    const hashedPassword = passwordHash.generate(password);
    const model = {
      id: randomNumber(options),
      password: hashedPassword,
      ...userDetails,
      created_on: moment(),
    };
    users.push(model);
    return model;
  }
}
