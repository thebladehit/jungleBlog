const path = require('node:path');
const { MIME_TYPES } = require('../mimetypes.js');
const { readFile, isFileExist } = require('../fs/fs.js');

const STATIC_PATH = path.resolve(__dirname, '..', 'static');
let eTag = new Date().toISOString();

const staticController = async (req, res, logger) => {
  if (req.headers['if-none-match']) {
    res.writeHead(304);
    return void res.end();
  }
  const paths = [STATIC_PATH, req.url];
  if (req.url === '/' || req.url.startsWith('/article')) {
    paths.pop();
    paths.push('/index.html');
  } 
  const filePath = path.join(...paths);
  if (!await isFileExist(filePath)) {
    res.writeHead(404);
    return void res.end('Not found');
  }
  try {
    const data = await readFile(filePath);
    const ext = path.extname(filePath).substring(1).toLowerCase();
    const mimeType = MIME_TYPES[ext];
    res.writeHead(200, { 'Content-Type': mimeType, 'ETag': eTag });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

module.exports = { staticController };