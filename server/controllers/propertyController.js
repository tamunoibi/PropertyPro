import PropertyModel from '../models/propertyModel';

const { create, update, updateStatus } = PropertyModel;

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

  static updateProperty(req, res) {
    let property;

    try {
      property = update(req, res);
      return res.status(200).json({
        status: 'success',
        data: property,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error Unable to modify property',
      });
    }
  }

  static markAsSold(req, res) {
    let property;

    try {
      property = updateStatus(req, res);
      return res.status(200).json({
        status: 'success',
        data: property,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error Unable to modify property',
      });
    }
  }
}
