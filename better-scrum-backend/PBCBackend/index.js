import express from 'express';
import dotenv from 'dotenv';
import createAndConnectToDatabase from './src/Config/database.js';
import router from './src/Routes/router.js';

/** Init the App */
dotenv.config();
const app = express();

/** Load env Variables */
const port = process.env.PORT || 2509;

app.use(express.static('public'))

/**
 * 1. Create a database if not exists
 * 2. Create the needed tables if not exists
 * 3. Create a connection pool to the database
 * 4. Create all routes for the REST API
*/
createAndConnectToDatabase().then((connection) => router(app, connection));

app.listen(port, () => {
  console.log(`PBC backend is running on port ${port}`)
})