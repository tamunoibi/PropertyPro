const users = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  address VARCHAR(100) NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

const properties = `CREATE TABLE IF NOT EXISTS properties(
  id SERIAL PRIMARY KEY,
  owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  status VARCHAR(10) DEFAULT 'available',
  price INTEGER,
  state VARCHAR(30),
  city VARCHAR(30),
  address VARCHAR(100),
  type VARCHAR(100),
  image_url VARCHAR(200),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
const flags = `CREATE TABLE IF NOT EXISTS flags(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE ON UPDATE CASCADE,
  reason VARCHAR(100) NOT NULL,
  description VARCHAR(200),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;


export default {
  users,
  flags,
  properties,
};

// TODO:
// updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
// add on update attribute to updated on column the current timestamp changes
