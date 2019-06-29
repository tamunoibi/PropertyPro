import PropertyModel from '../models/propertyModel';

const {
  create, update, updateStatus, remove, getAll,
} = PropertyModel;

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

  static deleteProperty(req, res) {
    try {
      const message = remove(req, res);

      if (message) {
        return res.status(200).json({
          status: 'success',
          data: { message },
        });
      }
      res.status(404).send({ status: 'error', error: 'The Property does not exist' });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error Unable to create new Bank account',
      });
    }
    return false;
  }

  static getAllProperty(req, res) {
    let property;

    try {
      property = getAll();
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
