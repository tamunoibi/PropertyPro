import moment from 'moment';
import passwordHash from 'password-hash';

export default {
  users: [
    {
      id: 1,
      email: 'example@example.com',
      firstName: 'Tammy',
      lastName: 'Aprekuma',
      password: passwordHash.generate('password'),
      type: 'staff',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Oke',
      password: passwordHash.generate('password'),
      type: 'cashier',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'johnoke@gmail.com',
      firstName: 'John',
      lastName: 'Oke',
      password: passwordHash.generate('password'),
      type: 'customer',
      isAdmin: false,
    },
  ],
};
