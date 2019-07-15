/* istanbul ignore file */
/* eslint-disable no-console */
import passwordHash from 'password-hash';
import pool from '../config/connection';


const password = passwordHash.generate('password');
const agentPassword = passwordHash.generate('admin');

const populateUsers = `INSERT INTO users(first_name, last_name, phone_number, password, email)
                  VALUES('Jon', 'Doe', '07035087654', '${password}', 'youMeAll@gmail.com')`;

const populateAgent = `INSERT INTO users(first_name, last_name, phone_number, password, email, is_admin)
                  VALUES('Admin', 'Admin', '09035087650', '${agentPassword}', 'helloyou@gmail.com', true)`;

const populateProperty = `INSERT INTO properties(price, state, city, address, image_url)
                    VALUES(500000, 'state', 'city', 'address', 'https://res.cloudinary.com/drjpxke9z/image/upload/v1549984207/pdp_nucvwu.jpg')`;

const populateflag = `INSERT INTO flags(user_id, property_id, description)
                    VALUES(1, 1, 'reason', 'description')`;


(async function seedDb() {
  const client = await pool.connect();
  try {
    await client.query(populateUsers);
    await client.query(populateAgent);
    await client.query(populateProperty);
    await client.query(populateflag);
  } catch (err) {
    console.log(err);
  } finally {
    await client.release();
  }
}());
