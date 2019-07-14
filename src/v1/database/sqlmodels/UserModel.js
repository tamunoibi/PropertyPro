import pool from '../../config/connection';


class UserModel {
  static async create(data) {
    const client = await pool.connect();

    const {
      first_name, last_name, phone_number, email,
      address, is_admin,
    } = data;

    const text = `INSERT INTO users(first_name, last_name, phone_number, password, email, address, is_admin )
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, first_name, last_name, phone_number, email, address, is_admin`;
    const values = [first_name, last_name, phone_number, email,
      address, is_admin];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }

  static async getUser(email) {
    const client = await pool.connect();

    const text = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    const model = await client.query({ text, values });
    await client.release();

    return model;
  }
}

export default UserModel;
