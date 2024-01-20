'use strict';

const { pool } = require('../db/pool.js');
const { isUserLogined } = require('./login.js');
const { cacher } = require('../cacher/cacherSingleton.js');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');

const universalController = async (req, res, logger, query, queryData) => {
  try {
    const client = await pool.connect();
    const data = await client.query(query, queryData);
    const resData = JSON.stringify(data.rows);
    const mimeType = MIME_TYPES['json'];
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(resData);
    const cache = { data: resData, mimeType };
    cacher.setCache(req.url, cache);
    client.release();
    if (req.method === 'GET') {
      const cache = { data: resData, mimeType };
      cacher.setCache(req.url, cache);
    } else {
      cacher.deleteCache(`${req.url}/feedbacks`);
      cacher.deleteCache(req.url);
    }
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

const getFeedbacks = async (req, res, logger, body, cookies) => {
  if (!isUserLogined(cookies)) {
    res.writeHead(401);
    return void res.end('Not authorised');
  }
  const query = 'SELECT * FROM jungleBlog.feedbacks ORDER BY created_at DESC';
  await universalController(req, res, logger, query);
};

const createFeedback = async (req, res, logger, body) => {
  const query = 'INSERT INTO jungleblog.feedbacks(name, text) VALUES($1, $2) RETURNING feedback_id, name, text';
  const queryData = [body.name, body.text];
  await universalController(req, res, logger, query, queryData);
};

module.exports = { getFeedbacks, createFeedback };