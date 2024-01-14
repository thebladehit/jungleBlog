'use strict';

const fs = require('node:fs');
const { Client } = require('pg');
require('dotenv').config({ path: '../.env' });
const { HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = require('../config/config.js');

const script = fs.readFileSync('./db.sql', 'utf-8');

(async () => {
  const client = new Client({
    host: HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
  });

  await client.connect();
  const result = await client.query(script);
  console.log(result);
  await client.end();
})();