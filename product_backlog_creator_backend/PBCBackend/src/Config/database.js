import pg from 'pg';
import dotenv from 'dotenv';

const { Pool, Client } = pg;
dotenv.config();

const client = new Client({
  host:  process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT),
});

const databaseClient = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT)
});


const createTablesString = `
CREATE TABLE IF NOT EXISTS department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR
);
CREATE TABLE IF NOT EXISTS sprint (
  sprint_id SERIAL PRIMARY KEY,
  sprint_number INT,
  sprint_name VARCHAR,
  department_id INT REFERENCES department (department_id)
);
CREATE TABLE IF NOT EXISTS product_backlog (
  product_backlog_id SERIAL PRIMARY KEY,
  department_id INT REFERENCES department (department_id)
);
CREATE TABLE IF NOT EXISTS ticket (
  ticket_id SERIAL PRIMARY KEY,
  ticket_tr_id INT,
  ticket_position INT,
  product_backlog_id INT REFERENCES product_backlog(product_backlog_id)
);
`;

/**
 * Create the Database .env.DATABASE_NAME if not exists
 */
const createDatabase = () => new Promise(async (resolve) => {
  await client.connect();
  client.query(
    `CREATE DATABASE ${process.env.DATABASE_NAME}`,
    () => {
      client.end();
      resolve();
    },
  );
});


/**
 * Connect to the created database and create
 * all needed tables
 */
const createTables = async () => {
  await databaseClient.connect();
  await databaseClient.query(createTablesString);
  await databaseClient.end();
}

/**
 * 1. Create a Database
 * 2. Create all needed tables
 * @returns Object connection pool to the created database
 */
const createAndConnectToDatabase = async () => {
  await createDatabase();
  await createTables();
  return new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT),
  });
}

export default createAndConnectToDatabase;