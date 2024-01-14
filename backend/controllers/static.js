const path = require('node:path');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');
const { readFile, isFileExist } = require('../fs/fs.js');
const { cacher } = require('../cacher/cacherSingleton.js');

const STATIC_PATH = path.resolve(__dirname, '..', 'static');

const pathes = {
  '/': '/index.html',
  '/article': '/index.html',
  '/about': '/index.html',
  '/feedback': '/index.html',
  '/adminPanel': '/adminPanel.html'
};

const staticController = async (req, res, logger) => {
  req.url = pathes[req.url] ? pathes[req.url] : req.url.startsWith('/article') ? pathes['/article'] : req.url;
  const paths = [STATIC_PATH, req.url];
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
    const cache = { data, mimeType };
    cacher.setCache(req.url, cache);
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

module.exports = { staticController };