import moment from 'moment';
import randomNumber from 'random-number';
import dummyData from './dummyData';

const { properties } = dummyData;
const options = {
  min: 9874316514,
  max: 18743165140,
  integer: true,
};

export default class PropertyModel {
  static create(property) {
    const model = {
      ...property,
      id: randomNumber(options),
      created_on: moment(),
    };
    properties.push(model);
    return model;
  }

  static update(propertyId, data) {
    let property = properties.find(eachProperty => (eachProperty.id === parseInt(propertyId, 10)));

    property = {
      ...property,
      ...data,
    };
    // p
    return property;
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
    if (!property) return res.status(404).send({ status: 'error', error: 'The Property does not exist' });

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

  static remove(propertyId, id) {
    let property;
    properties.forEach((eachProperty, index) => {
      if (eachProperty.id === parseInt(propertyId, 10)) {
        property = eachProperty.owner === id ? properties.splice(index, 1) : 'unauthorized';
      }
    });
    return property;
  }

  static getAll(type) {
    if (!type) return properties;

    const propertyOfType = [];
    properties.forEach((eachProperty) => {
      if (eachProperty.type === type) propertyOfType.push(eachProperty);
    });
    return propertyOfType;
  }


  static getSingle(propertyId) {
    return properties.find(eachProperty => eachProperty.id === parseInt(propertyId, 10));
  }
}
