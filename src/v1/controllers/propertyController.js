import PropertyModel from '../models/propertyModel';

const {
  create, update, remove, getAll, getSingle,
} = PropertyModel;

export default class PropertyController {
  static createProperty(req, res) {
    const {
      type, price, state, city, address, image_url,
    } = req.body;
    const status = 'available';
    const { id: owner } = req.data;
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
      return res.status(201).json({ status: 'success', data: others });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to post new property' });
    }
  }

  static updateProperty(req, res) {
    const { propertyId } = req.params;

    const {
      type, price, state, city, address, image_url,
    } = req.body;

    const existingProperty = getSingle(propertyId);
    if (!existingProperty) return res.status(404).send({ status: 'error', error: 'The Property does not exist' });
    if (existingProperty.owner !== req.data.id) return res.status(401).send({ status: 'error', error: 'Unauthorized' });

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
      return res.status(200).json({ status: 'success', data: others });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to modify property' });
    }
  }

  static markAsSold(req, res) {
    try {
      const { propertyId } = req.params;
      const existingProperty = getSingle(propertyId);
      if (!existingProperty) return res.status(404).send({ status: 'error', error: 'The Property does not exist' });
      if (existingProperty.owner !== req.data.id) return res.status(401).send({ status: 'error', error: 'Unauthorized' });
      const property = update(propertyId, { status: 'sold' });
      return res.status(200).json({ status: 'success', data: property });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to modify property' });
    }
  }

  static deleteProperty(req, res) {
    try {
      const { propertyId } = req.params;
      const { id } = req.data;
      const property = remove(propertyId, id);

      if (property === 'unauthorized') return res.status(401).send({ status: 'error', error: 'Unauthorized' });
      if (property === undefined) return res.status(404).send({ status: 'error', error: 'The Property does not exist' });
      return res.status(200).send({ status: 'success', data: 'Property successfully deleted' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to create new Bank account' });
    }
  }

  static getAllProperty(req, res) {
    const { type } = req.query;
    let property;

    try {
      property = type ? getAll(type) : getAll();
      if (property.length === 0) return res.status(404).send({ status: 'error', error: 'No property found' });

      return res.status(200).json({ status: 'success', data: property });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to post new property' });
    }
  }

  static getSpecificProperty(req, res) {
    const { propertyId } = req.params;
    try {
      const property = getSingle(propertyId);
      if (!property) return res.status(404).json({ status: 'error', error: 'The Property with the given id does not exist' });
      return res.status(200).json({ status: 'success', data: property });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to post new property' });
    }
  }
}
