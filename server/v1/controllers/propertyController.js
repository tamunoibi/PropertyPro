import PropertyModel from '../models/propertyModel';
import authentication from '../helpers/Authenticator';

const { decode } = authentication;

const {
  create, update, updateStatus, remove, getAll, getSingle,
} = PropertyModel;

export default class PropertyController {
  static createProperty(req, res) {
    const {
      type, price, state, city, address, image_url,
    } = req.body;
    const status = 'available';
    const token = req.body.token || req.headers.token;
    const decodedToken = decode(token);
    // console.log(decodedToken); // { id: 1, iat: 1558795050, exp: 1558805850 }

    const owner = decodedToken.id;

    const property = {
      owner,
      status,
      price,
      state,
      city,
      address,
      type,
      image_url,
    };

    try {
      const data = create(property);
      const { owner: propertyOwner, ...others } = data;
      return res.status(201).json({
        status: 'success',
        data: others,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error Unable to post new property',
      });
    }
  }

  static updateProperty(req, res) {
    const { propertyId } = req.params;

    const {
      type, price, state, city, address, image_url,
    } = req.body;
    const existingProperty = getSingle(propertyId);
    if (!existingProperty) {
      return res
        .status(404)
        .send({ status: 'error', error: 'The Property does not exist' });
    }

    const data = {
      type: type || existingProperty.type,
      price: price || existingProperty.price,
      state: state || existingProperty.state,
      city: city || existingProperty.city,
      address: address || existingProperty.address,
      image_url: image_url || existingProperty.image_url,
    };
    try {
      const property = update(propertyId, data);
      const { owner, ...others } = property;
      return res.status(200).json({
        status: 'success',
        data: others,
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
      property = getAll(req, res);
      return res.status(200).json({
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

  static getSpecificProperty(req, res) {
    const { propertyId } = req.params;
    try {
      const property = getSingle(propertyId);
      if (!property) {
        return res.status(404).json({
          status: 'error',
          error: 'The Property with the given id does not exist',
        });
      }
      return res.status(200).json({
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
