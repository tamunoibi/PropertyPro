/* istanbul ignore file */
import debug from 'debug';
import pool from '../config/connection';

const logger = debug('dev:migrateReset');

(async function migrateReset() {
  const client = await pool.connect();
  try {
    logger(process.env.NODE_ENV);
    logger('rolling back migrations...');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    await client.query('DROP TABLE IF EXISTS properties CASCADE');
    await client.query('DROP TABLE IF EXISTS flags CASCADE');
    await client.query('DROP TABLE IF EXISTS flagsTable CASCADE');
  } catch (err) {
    return;
  } finally {
    await client.release();
    logger('roll back completed');
  }
}());
