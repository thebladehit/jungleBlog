const { pool } = require('../db/pool.js');
const { MIME_TYPES } = require('../mimetypes.js');

const isBadId = (url) => {
  const splitedUrl = url.split('/');
  const storyId = splitedUrl[splitedUrl.length - 1];
  const parsedStoryId = +storyId;
  return isNaN(parsedStoryId);
};

const universalController = async (req, res, logger, query, code, queryData) => {
  try {
    const client = await pool.connect();
    const data = await client.query(query, queryData);
    res.writeHead(code ? code : 200, { 'Content-Type': MIME_TYPES['json'] });
    res.end(JSON.stringify(data.rows));
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.log(err);
  }
};

const getAllComments = async (req, res, logger) => {
  const query = 'SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments ORDER BY created_at';
  await universalController(req, res, logger, query);
};

const getCommentsByStoryId = async (req, res, logger) => {
  if (isBadId(req.url)) {
    res.writeHead(400);
    return res.end(`Invalid story id in getting comments, id = "${storyId}"`);
  };
  const query = `SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments WHERE story_id=${storyId} ORDER BY created_at DESC`;
  await universalController(req, res, logger, query);
};

const createComment = async (req, res, logger, body) => {
  if (isBadId(req.url)) {
    res.writeHead(400);
    return res.end(`Invalid story id, id = "${storyId}"`);
  };
  const queryData = [body.story_id, body.username, body.comment_text];
  const query = 'INSERT INTO jungleblog.comments(story_id, username, comment_text) VALUES ($1, $2, $3) RETURNING username, comment_text, created_at';
  await universalController(req, res, logger, query, 201, queryData);
};

const deleteComment = async (req, res, logger, body) => {
  if (isBadId(req.url)) {
    res.writeHead(400);
    return res.end(`Invalid comment id, id = "${storyId}"`);
  };
  const commentId = body.comment_id;
  const query = `DELETE FROM jungleblog.comments WHERE comment_id = ${commentId}`;
  await universalController(req, res, logger, query, 204);
};

const updateComment = async (req, res, logger, body) => {
  if (isBadId(req.url)) {
    res.writeHead(400);
    return res.end(`Invalid comment id, id = "${storyId}"`);
  };
  const queryData = [body.comment_text, body.username, body.comment_id];
  const query = 'UPDATE jungleblog.comments SET comment_text = $1, username = $2 WHERE comment_id=$3 RETURNING comment_id, username, comment_text, created_at';
  universalController(req, res, logger, query, null, queryData);
};

module.exports = { getAllComments, getCommentsByStoryId, createComment, deleteComment, updateComment };