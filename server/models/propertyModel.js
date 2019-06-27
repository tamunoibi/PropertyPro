import moment from 'moment';
import dummyData from './dummyData';
import authentication from '../helpers/Authenticator';

const { properties } = dummyData;
const { decode } = authentication;

export default class AccountModel {
  static create(req, res) {
    const {
 type, price, state, city, address, image_url 
} = req.body;
    const status = 'sold';
    const token = req.body.token || req.headers.token;
    const decodedToken = decode(token);
    // console.log(decodedToken); // { id: 1, iat: 1558795050, exp: 1558805850 }

    const owner = decodedToken.id;

    const property = {
      id: properties.length + 1,
      owner,
      status,
      price,
      state,
      city,
      address,
      type,
      image_url,
      created_on: moment(),
    };

    try {
      properties.push(property);
      const { id } = property;
      const propertyDetails = {
        id,
        status,
        type,
        state,
        city,
        address,
        price,
        created_on: moment(),
        image_url,
      };
      return propertyDetails;
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'error', message: 'Internal Server error' });
    }
  }
}
