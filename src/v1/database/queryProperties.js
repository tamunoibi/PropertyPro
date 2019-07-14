import pool from '../config/connection';
// TODO:
/*
  1. Get all properties
  2. Get a single property
  2. Get a property of a particular id
  3. Filter get search
  4. Flag an advert as fraudulent

  // Admins
  5. Update the details of a property
  4. Post a property
  6. Mark a property as sold
  7. Delete a property                    =   Done

*/
class PropertyController {
  static async createProperty(req, res) {
    const App = PropertyController;

    const { id } = req.body.token;
    const evidence = App.resolveEvidence(req);
    const sqlQuery = `INSERT INTO property(user_id, price, state, city, address, image_url)
        VALUES($1, $2, $3, $4) RETURNING *`;
    // TODO: start here
    const values = [office, id, body, evidence];
    const client = await pool.connect();
    let property;
    try {
      property = await client.query({ text: sqlQuery, values });
      if (property.rowCount) {
        return res.status(201).json({ status: 201, data: property.rows[0], message: 'Property submitted' });
      }
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } catch (err) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally { await client.release(); }
  }

  static resolveEvidence(req) {
    const { imageUrl, videoUrl } = req.body;
    let evidence = '{}';
    if (imageUrl && videoUrl) {
    /* istanbul ignore next */
      evidence = `{${imageUrl}, ${videoUrl}}`;
    } if (!imageUrl && videoUrl) {
    /* istanbul ignore next */
      evidence = `{${videoUrl}}`;
    }
    if (!videoUrl && imageUrl) {
    /* istanbul ignore next */
      evidence = `{${imageUrl}}`;
    }
    return evidence;
  }

  static async getAllPropertys(req, res) {
    const sqlQuery = `SELECT property.*, users.firstname, users.lastname, offices.name as officename
    FROM property
    JOIN users ON users.id = property.createdBy
    JOIN offices ON offices.id = property.office
    ORDER BY createdon DESC`;
    const client = await pool.connect();
    try {
      const property = await client.query(sqlQuery);
      if (property.rowCount) {
        return res.status(200).json({ status: 200, data: property.rows, message: 'OK' });
      }
      return res.status(200).json({ status: 200, data: [], message: 'No record found' });
    } catch (err) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally { await client.release(); }
  }

  static async getProperty(req, res) {
    const { propertyId } = req.params;
    const sqlQuery = `SELECT property.*, , users.lastname, offices.name as officename
    FROM property
    JOIN users ON users.id = property.createdBy
    JOIN offices ON offices.id = property.office
    WHERE property.id = $1
    ORDER BY createdon DESC`;
    const values = [propertyId];
    const client = await pool.connect();
    try {
      const property = await client.query({ text: sqlQuery, values });
      if (property.rowCount) {
        return res.status(200).json({ status: 200, data: property.rows[0], message: 'OK' });
      }
      return res.status(200).json({ status: 404, message: 'Property Not Found' });
    } catch (err) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally { await client.release(); }
  }

  /**
 *@description Deletes a property
 * @param {object} req - request
 * @param {object} res - response
 */
  static async deleteProperty(req, res) {
    const { propertyId } = req.params;
    const sqlQuery = { text: 'DELETE FROM property WHERE id = $1 RETURNING id', values: [propertyId] };
    const client = await pool.connect();
    try {
      const property = await client.query(sqlQuery);
      if (property.rowCount) {
        return res.status(200).json({
          status: 200,
          message: 'Property deleted successfully',
        });
      }
      return res.status(500).json({ status: 500, error: 'Property Not Found ' });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal Server error' });
    } finally {
      await client.release();
    }
  }
}
export default PropertyController;
