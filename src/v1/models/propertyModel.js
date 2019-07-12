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
    const index = properties.findIndex(eachProperty => (eachProperty.id === parseInt(propertyId, 10)));

    let property = properties[index];
    property = {
      ...properties[index],
      ...data,
    };
    properties[index] = property;
    return property;
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
