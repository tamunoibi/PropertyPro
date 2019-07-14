/* istanbul ignore file */
import passwordHash from 'password-hash';
import debug from 'debug';
import pool from '../config/connection';

const logger = debug('dev:testSeed');


const password = passwordHash.generate('password');
const agentPassword = passwordHash.generate('admin');

const user1 = `INSERT INTO users(first_name, last_name, phone_number, password, email)
VALUES('Jon', 'Doe', '07035087654', '${password}', 'youMeAll@gmail.com')`;

const agent = `INSERT INTO users(first_name, last_name, phone_number, password, email, is_admin)
VALUES('Admin', 'Admin', '09035087650', '${agentPassword}', 'helloyou@gmail.com', true)`;

const property1 = `INSERT INTO properties(price, state, city, address, image_url)
VALUES(500000, 'state', 'city', 'address', 'https://res.cloudinary.com/drjpxke9z/image/upload/v1549984207/pdp_nucvwu.jpg')`;

const flag1 = `INSERT INTO flags(user_id, property_id, reason, description)
VALUES(1, 1, 'reason' , 'description')`;


(async function seedDb() {
  const client = await pool.connect();
  try {
    logger('Query starting...');
    logger(`Query...: ${user1}`);
    await client.query(user1);
    logger(`Querry...: ${agent}`);
    await client.query(agent);
    logger(`Querry...: ${property1}`);
    await client.query(property1);
    logger(`Querry...: ${flag1}`);
    await client.query(flag1);
  } catch (err) {
    logger(err);
  } finally {
    await client.release();
  }
}());
