import pool from '../../config/connection';


class PropertyModel {
  static async create(property) {
    const client = await pool.connect();

    const {
      price, state, city, address, type, image_url,
    } = property;

    const text = `INSERT INTO users(price, state, city, address, type, image_url)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING price, state, city, address, type, image_url`;
    const values = [price, state, city, address, type, image_url];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }


  static async update(propertyId, data) {
    const client = await pool.connect();
    const {
      price, state, city, address, type, image_url,
    } = data;

    const text = 'INSERT INTO  properties(price, state, city, address, type, image_url) WHERE id = $1 VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [propertyId, price, state, city, address, type, image_url];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }

  static async remove(propertyId, id) {
    const client = await pool.connect();

    const text = 'DELETE FROM properties WHERE id = $1';
    const values = [propertyId];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }

  static async getAll(type) {
    const client = await pool.connect();

    const text = type ? 'SELECT * FROM properties WHERE type = $1' : 'SELECT * FROM properties';
    const values = [type];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }

  static async getSingle(id) {
    const client = await pool.connect();

    const text = 'SELECT * FROM properties WHERE id = $1';
    const values = [id];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }
}

export default PropertyModel;
