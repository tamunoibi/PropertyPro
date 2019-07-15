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
