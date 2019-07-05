import moment from 'moment';
import dummyData from './dummyData';

const { properties } = dummyData;

export default class PropertyModel {
  static create(property) {
    const model = {
      ...property,
      id: properties.length + 1,
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

  static remove(req) {
    const { propertyId } = req.params;
    let accountIndex;

    const property = properties.find((eachProperty, index) => {
      if (eachProperty.id === parseInt(propertyId, 10)) {
        accountIndex = index;
        return eachProperty;
      }
    });

    if (!property) { return false; }
    properties.splice(accountIndex, 1);
    return 'Property successfully deleted';
  }

  static getAll(req, res) {
    if (properties) {
      const { type } = req.query;


      if (!type) {
        return properties;
      }

      const propertyOfType = [];
      properties.forEach((eachProperty) => {
        if (eachProperty.type === type) {
          propertyOfType.push(eachProperty);
        }
      });
      if (propertyOfType.length > 0) {
        return propertyOfType;
      }
    }
    return res
      .status(404)
      .send({ status: 'error', error: 'No property found' });
  }

  static getSingle(propertyId) {
    return properties.find(eachProperty => eachProperty.id === parseInt(propertyId, 10));
  }
}
