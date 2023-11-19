'use strict';

require('dotenv').config();
const http = require('node:http');

const { PORT } = require('./config/config.js');

const server = http.createServer((req, res) => {
  res.end('hello');
}).listen(PORT, () => {
  console.log(`Starting on ${PORT}...`)
});