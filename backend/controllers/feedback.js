const { pool } = require('../db/pool.js');
const { cacher } = require('../cacher/cacherSingleton.js');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');

const getFeedbacks = async (req, res, logger) => {
  try {
    const client = await pool.connect();
    const data = await client.query('SELECT * FROM jungleBlog.feedbacks ORDER BY created_at DESC');
    const resData = JSON.stringify(data.rows);
    const mimeType = MIME_TYPES['json'];
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(resData);
    const cache = { data: resData, mimeType };
    cacher.setCache(req.url, cache);
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

const createFeedback = async (req, res, logger, body) => {
  try {
    const client = await pool.connect();
    const queryData = [body.name, body.text];
    const query = 'INSERT INTO jungleblog.feedbacks(name, text) VALUES($1, $2) RETURNING feedback_id, name, text';
    const data = await client.query(query, queryData);
    const resData = JSON.stringify(data.rows);
    const mimeType = MIME_TYPES['json'];
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(resData);
    const cache = { data: resData, mimeType };
    cacher.setCache(req.url, cache);
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

module.exports = { getFeedbacks, createFeedback };