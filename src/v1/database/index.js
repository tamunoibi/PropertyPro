/* istanbul ignore file */
import debug from 'debug';
import pool from '../config/connection';
import table from './tables';

const { users, flags, properties } = table;
const logger = debug('dev:migrate');

logger(process.env.NODE_ENV);
// const debugger = debug('migration');
(async function migrate() {
  logger('migrating...');
  const client = await pool.connect();
  try {
    logger('migrating users..');
    await client.query(users);

    logger('migrating properties..');
    await client.query(properties);

    logger('migrating flags..');
    await client.query(flags);
  } catch (err) {
    logger(err);
  } finally {
    await client.release();
    logger('migration completed');
  }
}());
