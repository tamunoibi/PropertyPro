/* istanbul ignore file */
import { Pool } from 'pg';
import dbConfig from './dbConfig';

const env = dbConfig.dbEnv;

const connectionString = process.env.WINDOWS_NODE_ENV ? dbConfig.test : dbConfig[env];

const ssl = env === 'production';
const pool = new Pool({
  connectionString,
  ssl,
});


export default pool;
