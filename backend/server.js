'use strict';

require('dotenv').config();
const http = require('node:http');
const path = require('node:path');
const { readFile, isFileExist } = require('./fs/fs.js');
const { MIME_TYPES } = require('./mimetypes.js');

const { PORT } = require('./config/config.js');
const STATIC_PATH = path.resolve(__dirname, 'static');

const server = http.createServer(async (req, res) => {
  const paths = [STATIC_PATH, req.url];
  if (req.url === '/') paths.push('index.html');
  const filePath = path.join(...paths);
  if (!await isFileExist(filePath)) {
    res.writeHead(404);
    return void res.end('Not found');
  }
  try {
    const data = await readFile(filePath);
    const ext = path.extname(filePath).substring(1).toLowerCase();
    const mimeType = MIME_TYPES[ext];
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    // log it in file 
  }
});

server.listen(PORT, () => {
  console.log(`Starting on ${PORT}...`)
});