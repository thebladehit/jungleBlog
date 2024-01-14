'use strict';

const { Pool } = require('pg');
const { HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = require('../config/config.js');

const pool = new Pool({
  host: HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD
});

module.exports = { pool };