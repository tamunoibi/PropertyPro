import pool from '../config/connection';


export default class PropertyController {
  static async createProperty(req, res) {
    const client = await pool.connect();
    try {
      const {
        type, price, state, city, address, image_url,
      } = req.body;
      const status = 'available';
      const { id: owner } = req.data;


      const property = {
        owner, status, price, state, city, address, type, image_url,
      };
      const columns = Object.keys(property);
      const values = Object.values(property);
      const sqlQuery = `INSERT INTO properties(${columns.toString()}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
      const { rows, rowCount } = await client.query({ text: sqlQuery, values });

      if (rowCount) {
        const { owner: propertyOwner, ...data } = rows[0];
        return res.status(201).json({ status: 'success', data });
      }

      return res.status(500).json({ status: 'error', error: 'Unable to save property' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to post new property' });
    } finally {
      await client.release();
    }
  }

  static async updateProperty(req, res) {
    const client = await pool.connect();
    try {
      const {
        price, state, city, address, image_url,
      } = req.body;
      const { propertyId } = req.params;
      const { id } = req.data;

      const updateQuery = {
        text: `UPDATE properties
              SET
                price = COALESCE($1, price),
                state = COALESCE($2, state),
                city = COALESCE($3, city),
                address = COALESCE($4, address),
                image_url = COALESCE($5, image_url)
              WHERE owner = $6 AND id = $7  RETURNING *`,
        values: [price, state, city, address, image_url, id, propertyId],
      };
      const { rows, rowCount } = await client.query(updateQuery);
      if (rowCount) {
        const { owner, ...data } = rows[0];
        return res.status(200).send({ status: 'success', data });
      }
      return res.status(404).send({ status: 'error', error: 'Property with the given particulars not found' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to update property' });
    } finally {
      await client.release();
    }
  }

  static async markAsSold(req, res) {
    const client = await pool.connect();
    try {
      const { propertyId } = req.params;
      const { id } = req.data;
      const status = 'available';
      const updateQuery = {
        text: 'UPDATE properties SET status = $1 WHERE owner = $2 AND id = $3  RETURNING *',
        values: [status, id, propertyId],
      };
      const property = await client.query(updateQuery);
      const { rows, rowCount } = property;
      if (rowCount) {
        const { owner, ...data } = rows[0];
        return res.status(200).send({ status: 'success', data });
      }
      return res.status(404).send({ status: 'error', error: 'Property with the given particulars not found' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to mark property as sold' });
    } finally {
      await client.release();
    }
  }

  static async getAllProperty(req, res) {
    const client = await pool.connect();
    try {
      const { type } = req.query;
      const getAllQuery = `SELECT
                            properties.*,
                            users.phone_number as owner_phone_number, users.email as owner_email
                            FROM properties
                            INNER JOIN users
                            ON properties.owner = users.id`;
      const getTypeQuery = {
        text: `SELECT
                properties.*,
                users.phone_number as owner_phone_number, users.email as owner_email
          FROM properties
          INNER JOIN users
          ON properties.owner = users.id
          WHERE type = $1`,
        values: [type],
      };
      const query = type ? getTypeQuery : getAllQuery;
      const { rows, rowCount } = await client.query(query);
      if (rowCount) {
        const { owner, ...data } = rows;
        return res.status(200).send({ status: 'success', data });
      }
      return res.status(404).send({ status: 'error', error: 'No properties yet' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to get all properties' });
    } finally {
      await client.release();
    }
  }

  static async getSpecificProperty(req, res) {
    const client = await pool.connect();

    try {
      const { propertyId } = req.params;
      const getSingleQuery = {
        text: 'SELECT * FROM properties WHERE id = $1',
        values: [propertyId],
      };
      const { rows, rowCount } = await client.query(getSingleQuery);
      if (rowCount) {
        const { owner, ...data } = rows[0];
        return res.status(200).send({ status: 'success', data });
      }
      return res.status(404).send({ status: 'error', error: 'The Property with the given particulars does not exist' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to get the specified property' });
    } finally {
      await client.release();
    }
  }

  static async deleteProperty(req, res) {
    const client = await pool.connect();

    try {
      const { propertyId } = req.params;
      const { id } = req.data;

      const deletePropertyQuery = {
        text: 'DELETE FROM properties WHERE owner = $1 AND id = $2',
        values: [id, propertyId],
      };
      const { rowCount } = await client.query(deletePropertyQuery);
      if (rowCount) {
        return res.status(200).send({ status: 'success', data: { message: 'Property successfully deleted' } });
      }
      return res.status(404).send({ status: 'error', error: 'The Property with the given particulars does not exist' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error Unable to delete the property' });
    } finally {
      await client.release();
    }
  }
}
