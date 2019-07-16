/* istanbul ignore file */
import passwordHash from 'password-hash';
import debug from 'debug';
import pool from '../config/connection';

const logger = debug('dev:testSeed');
  

const password = passwordHash.generate('password');
const agentPassword = passwordHash.generate('admin');

const user1 = `INSERT INTO users(email, first_name, last_name, phone_number, password, address)
VALUES('testUserEmail@example.com', 'userFirstName', 'userLastName', '07035087654', '${password}', 'testAddress')`;

const agent = `INSERT INTO users(email, first_name, last_name, phone_number, password, address, is_admin)
VALUES('testAgentEmail@example.com', 'agentFirstName', 'agentLastName', '07090679332', '${agentPassword}', 'testAddress', true)`;

const property1 = `INSERT INTO properties(owner, price, state, city, address, type, image_url)
VALUES(2, 500000, 'state', 'city', 'address', 'typeOfProperty', 'http://res.cloudinary.com/dqdbrbcqm/image/upload/t_media_lib_thumb/v1563016246/PropertyProLite/ubpm9mgjfcyvodbfez03.jpg')`;

const flag1 = `INSERT INTO flags(user_id, property_id, reason, description)
VALUES(1, 1, 'reason' , 'description')`;


(async function seedDb() {
  const client = await pool.connect();

  try {
    logger('Query starting...');
    logger(`Query...: ${user1}`);
    await client.query(user1);
    logger(`Query...: ${agent}`);
    await client.query(agent);
    logger(`Query...: ${property1}`);
    await client.query(property1);
    logger(`Query...: ${flag1}`);
    await client.query(flag1);
  } catch (err) {
    logger(err);
  } finally {
    await client.release();
  }
}());
