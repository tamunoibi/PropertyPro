import moment from 'moment';
import dummyData from './dummyData';
import authentication from '../helpers/Authenticator';

const { properties } = dummyData;
const { decode } = authentication;

export default class PropertyModel {
  static create(req, res) {
    const {
      type, price, state, city, address, image_url,
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

  static update(req, res) {
    const { propertyId } = req.params;

    const {
      type, price, state, city, address, image_url,
    } = req.body;
    let propertyIndex;

    const property = properties.find((eachProperty, index) => {
      if (eachProperty.id === parseInt(propertyId, 10)) {
        propertyIndex = index;
        return eachProperty;
      }
    });
    if (!property) {
      return res
        .status(404)
        .send({ status: 'error', error: 'The Property does not exist' });
    }

    if (type) {
      property.type = type;
    }
    if (price) {
      property.price = price;
    }
    if (state) {
      property.state = state;
    }
    if (city) {
      property.city = city;
    }
    if (address) {
      property.address = address;
    }
    if (image_url) {
      property.image_url = image_url;
    }
    properties.splice(propertyIndex, 1, property);

    const propertyDetails = {
      id: property.id,
      status: property.status,
      type: property.type,
      state: property.state,
      city: property.city,
      address: property.address,
      price: property.price,
      created_on: property.created_on,
      image_url: property.image_url,
      ownerEmail: 'email',
      ownerPhoneNumber: 'number',
    };
    return propertyDetails;
  }

  static updateStatus(req, res) {
    const { propertyId } = req.params;

    const status = 'sold';
    let propertyIndex;

    const property = properties.find((eachProperty, index) => {
      if (eachProperty.id === parseInt(propertyId, 10)) {
        propertyIndex = index;
        return eachProperty;
      }
    });
    if (!property) {
      return res
        .status(404)
        .send({ status: 'error', error: 'The Property does not exist' });
    }


    property.status = status;
    properties.splice(propertyIndex, 1, property);

    const propertyDetails = {
      id: property.id,
      status: property.status,
      type: property.type,
      state: property.state,
      city: property.city,
      address: property.address,
      price: property.price,
      created_on: property.created_on,
      image_url: property.image_url,
      ownerEmail: 'email',
      ownerPhoneNumber: 'number',
    };
    return propertyDetails;
  }
}
