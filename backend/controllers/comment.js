const { pool } = require('../db/pool.js');
const { MIME_TYPES } = require('../mimetypes.js');

const getAllComments = async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query('SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments ORDER BY created_at');
    res.writeHead(200, { 'Content-Type': MIME_TYPES['json'] });
    res.end(JSON.stringify(data.rows));
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.log(err);
  }
};

const getCommentsByStoryId = async (req, res, logger) => {
  try {
    const splitedUrl = req.url.split('/');
    const storyId = splitedUrl[splitedUrl.length - 1];
    const parsedStoryId = +storyId;
    if (isNaN(parsedStoryId)) throw new Error(`Invalid story id in getting comments, id = "${storyId}"`);
    const client = await pool.connect();
    const data = await client.query(`SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments WHERE story_id=${storyId} ORDER BY created_at DESC`);
    res.writeHead(200, { 'Content-Type': MIME_TYPES['json'] });
    res.end(JSON.stringify(data.rows));
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.log(err);
  }
};

const createComment = async (req, res, logger) => {

};

const deleteComment = async (req, res, logger) => {

};

const updateComment = async (req, res, logger) => {

};

module.exports = { getAllComments, getCommentsByStoryId, createComment, deleteComment, updateComment };