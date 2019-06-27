import moment from 'moment';
import passwordHash from 'password-hash';

export default {
  users: [
    {
      id: 1,
      email: 'example@example.com',
      first_name: 'Tammy',
      last_name: 'Aprekuma',
      password: passwordHash.generate('password'),
      phoneNumber: '08136532017',
      address: '20 Banana Island Road, Lagos',
      is_admin: true,
    },
    {
      id: 2,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Oke',
      phoneNumber: '08136532017',
      address: '20 Banana Island Road, Lagos',
      password: passwordHash.generate('password'),
      is_admin: false,
    },
    {
      id: 3,
      email: 'johnoke@gmail.com',
      first_name: 'John',
      last_name: 'Oke',
      phoneNumber: '08136532017',
      address: '20 Banana Island Road, Lagos',
      password: passwordHash.generate('password'),
      is_admin: false,
    },
  ],
  properties: [
    {
      id: 1,
      owner: 1,
      status: 'available',
      price: '20000',
      state: 'Lagos State',
      city: 'Yaba',
      address: '20 Ikorodu Road',
      type: '3 Bedroom',
      created_on: moment(),
      image_url: 'http:cloud',
    },
    {
      id: 2,
      owner: 3,
      status: 'sold',
      price: '20000',
      state: 'Lagos State',
      city: 'Yaba',
      address: '20 Ikorodu Road',
      type: '3 Bedroom',
      created_on: moment(),
      image_url: 'http:cloud',
    },
  ],
};
