'use strict';

const { pool } = require('../db/pool.js');
const { isUserLogined } = require('./login.js');
const { cacher } = require('../cacher/cacherSingleton.js');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');

const universalController = async (req, res, logger, query, queryData, storyId) => {
  try {
    const client = await pool.connect();
    const data = await client.query(query, queryData);
    const resData = JSON.stringify(data.rows);
    const mimeType = MIME_TYPES['json'];
    res.writeHead(200, { 'Content-Type': mimeType });
    client.release();
    if (req.method === 'GET') {
      const cache = { data: resData, mimeType };
      cacher.setCache(req.url, cache);
    } else {
      cacher.deleteCache(`${req.url}/${storyId}`);
      cacher.deleteCache(req.url);
    }
    res.end(resData);
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

const getStories = async (req, res, logger) => {
  const query = 'SELECT story_id, title, content, image_url, created_at FROM jungleBlog.stories ORDER BY story_id';
  await universalController(req, res, logger, query);    
};

const getStory = async (req, res, logger) => {
  const splitedUrl = req.url.split('/');
  const storyId = splitedUrl[splitedUrl.length - 1];
  const parsedStoryId = +storyId;
  if (isNaN(parsedStoryId)) {
    res.writeHead(400);
    return void res.end(`Invalid story id, id = "${storyId}"`);
  }
  const query = `SELECT story_id, title, content, image_url FROM jungleBlog.stories WHERE story_id=${storyId}`;
  await universalController(req, res, logger, query);
};

const updateStory = async (req, res, logger, body, cookies) => {
  if (!isUserLogined(cookies)) {
    res.writeHead(401);
    return void res.end('Not authorised');
  }
  const storyId = body.story_id;
  if (isNaN(+storyId)) {
    res.writeHead(400);
    return void res.end(`Invalid story id, id = "${storyId}"`);
  }
  const query = `UPDATE jungleBlog.stories SET content = $1 WHERE story_id = ${storyId}`;
  const queryData = [body.content];
  await universalController(req, res, logger, query, queryData, storyId);
};

module.exports = { getStories, getStory, updateStory };