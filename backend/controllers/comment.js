const { pool } = require('../db/pool.js');
const { cacher } = require('../cacher/cacherSingleton.js');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');

const isBadId = (id) => isNaN(id);

const getStoryIdFromUrl = (url) => {
  const splitedUrl = url.split('/');
  const storyId = splitedUrl[splitedUrl.length - 1];
  return +storyId;
}

const universalController = async (req, res, logger, query, code, queryData) => {
  try {
    const client = await pool.connect();
    const data = await client.query(query, queryData);
    const resData = JSON.stringify(data.rows);
    const mimeType = MIME_TYPES['json'];
    res.writeHead(code ? code : 200, { 'Content-Type': mimeType });
    res.end(resData);
    if (req.method === 'GET') {
      const cache = { data: resData, mimeType };
      cacher.setCache(req.url, cache);
    } else {
      cacher.deleteCache(`${req.url}/${data.rows[0].story_id}`);
      cacher.deleteCache(req.url);
    }
    client.release();
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};

const getAllComments = async (req, res, logger) => {
  const query = 'SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments ORDER BY created_at';
  await universalController(req, res, logger, query);
};

const getCommentsByStoryId = async (req, res, logger) => {
  const storyId = getStoryIdFromUrl(req.url);
  if (isBadId(storyId)) {
    res.writeHead(400);
    return res.end(`Invalid story id in getting comments, id = "${storyId}"`);
  };
  const query = `SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments WHERE story_id=${storyId} ORDER BY created_at DESC`;
  await universalController(req, res, logger, query);
};

const createComment = async (req, res, logger, body) => {
  const storyId = body.story_id;
  if (isBadId(storyId)) {
    res.writeHead(400);
    return res.end(`Invalid story id, id = "${storyId}"`);
  };
  const queryData = [body.story_id, body.username, body.comment_text];
  const query = 'INSERT INTO jungleblog.comments(story_id, username, comment_text) VALUES ($1, $2, $3) RETURNING username, comment_text, created_at, story_id';
  await universalController(req, res, logger, query, 201, queryData);
};

const deleteComment = async (req, res, logger, body) => {
  const commentId = body.comment_id;
  if (isBadId(commentId)) {
    res.writeHead(400);
    return res.end(`Invalid comment id, id = "${commentId}"`);
  };
  const query = `DELETE FROM jungleblog.comments WHERE comment_id = ${commentId} RETURNING story_id`;
  await universalController(req, res, logger, query, 204);
};

const updateComment = async (req, res, logger, body) => {
  const commentId = body.comment_id;
  if (isBadId(commentId)) {
    res.writeHead(400);
    return res.end(`Invalid comment id, id = "${storyId}"`);
  };
  const queryData = [body.comment_text, body.username, commentId];
  const query = 'UPDATE jungleblog.comments SET comment_text = $1, username = $2 WHERE comment_id=$3 RETURNING comment_id, username, comment_text, created_at, story_id';
  universalController(req, res, logger, query, null, queryData);
};

module.exports = { getAllComments, getCommentsByStoryId, createComment, deleteComment, updateComment };