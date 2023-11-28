const { pool } = require('../db/pool.js');
const { MIME_TYPES } = require('../mimetypes.js');

const getStories = async (req, res, logger) => {
  try {
    const client = await pool.connect();
    const data = await client.query('SELECT story_id, title, content FROM jungleBlog.stories');
    res.writeHead(200, { 'Content-Type': MIME_TYPES['json'] });
    res.end(JSON.stringify(data.rows));
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.log(err);
  }
};

const getStory = async (req, res) => {

};

module.exports = { getStories, getStory };