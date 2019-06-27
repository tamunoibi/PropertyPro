import PropertyModel from '../models/propertyModel';

const { create } = PropertyModel;

export default class PropertyController {
  static createProperty(req, res) {
    let property;

    try {
      property = create(req, res);
      return res.status(201).json({
        status: 'success',
        data: property,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error Unable to post new property',
      });
    }
  }
}
