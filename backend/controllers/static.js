const path = require('node:path');
const { MIME_TYPES } = require('../mimetypes.js');
const { readFile, isFileExist } = require('../fs/fs.js');

const STATIC_PATH = path.resolve(__dirname, '..', 'static');

const staticController = async (req, res, logger) => {
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
    await logger.log(err);
  }
};

module.exports = { staticController };