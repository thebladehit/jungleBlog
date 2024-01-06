const { pool } = require('../db/pool.js');
const { cacher } = require('../cacher/cacherSingleton.js');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');

const getStories = async (req, res, logger) => {
  try {
    const client = await pool.connect();
    const data = await client.query('SELECT story_id, title, content, image_url FROM jungleBlog.stories ORDER BY story_id');
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

const getStory = async (req, res, logger) => {
  try {
    const splitedUrl = req.url.split('/');
    const storyId = splitedUrl[splitedUrl.length - 1];
    const parsedStoryId = +storyId;
    if (isNaN(parsedStoryId)) {
      res.writeHead(400);
      return void res.end(`Invalid story id, id = "${storyId}"`);
    }
    const client = await pool.connect();
    const data = await client.query(`SELECT story_id, title, content, image_url FROM jungleBlog.stories WHERE story_id=${storyId}`);
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

module.exports = { getStories, getStory };