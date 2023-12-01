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

const createComment = async (req, res, logger, body) => {
  try {
    const queryData = [body.story_id, body.username, body.comment_text];
    const client = await pool.connect();
    const data = await client.query('INSERT INTO jungleblog.comments(story_id, username, comment_text) VALUES ($1, $2, $3) RETURNING username, comment_text, created_at', queryData);
    res.writeHead(201, { 'Content-Type': MIME_TYPES['json'] });
    res.end(JSON.stringify(data.rows));
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.log(err);
  }
};

const deleteComment = async (req, res, logger, body) => {
  try {
    const commentId = body.comment_id;
    const client = await pool.connect();
    await client.query(`DELETE FROM jungleblog.comments WHERE comment_id = ${commentId}`);
    res.writeHead(204, { 'Content-Type': MIME_TYPES['json'] });
    res.end();
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.log(err);
  }
};

const updateComment = async (req, res, logger, body) => {
  try {
    const queryData = [body.comment_text, body.username, body.comment_id];
    const client = await pool.connect();
    const data = await client.query('UPDATE jungleblog.comments SET comment_text = $1, username = $2 WHERE comment_id=$3 RETURNING comment_id, username, comment_text, created_at', queryData);
    res.writeHead(201, { 'Content-Type': MIME_TYPES['json'] });
    res.end(JSON.stringify(data.rows));
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end(err.message);
    await logger.log(err);
  }
};

module.exports = { getAllComments, getCommentsByStoryId, createComment, deleteComment, updateComment };