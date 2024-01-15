'use strict';

const { pool } = require('../db/pool.js');
const { HOST } = require('../config/config.js');
const { isUserLogined } = require('./login.js');
const { cacher } = require('../cacher/cacherSingleton.js');
const { MIME_TYPES } = require('../mimeTypes/mimetypes.js');

const isBadId = (id) => isNaN(id);

const getStoryIdFromUrl = (url) => {
  const splitedUrl = url.split('/');
  const storyId = splitedUrl[splitedUrl.length - 1];
  return +storyId;
};

const getParamsFromUrl = (url) => new URL(url, `http://${HOST}`);

const universalController = async (req, res, logger, query, code, queryData) => {
  try {
    const client = await pool.connect();
    const data = await client.query(query, queryData);
    if (req.method === 'DELETE' && data.rows.length === 0) {
      res.writeHead(400);
      return void res.end('Bad request');
    }
    const resData = JSON.stringify(data.rows);
    const mimeType = MIME_TYPES['json'];
    res.writeHead(code ? code : 200, { 'Content-Type': mimeType });
    res.end(resData);
    client.release();
    if (req.method === 'GET') {
      const cache = { data: resData, mimeType };
      cacher.setCache(req.url, cache);
    } else {
      cacher.deleteCache(`${req.url}/${data.rows[0].story_id}`);
      cacher.deleteCache(req.url);
    }
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    await logger.error(err);
  }
};


const getAllComments = async (req, res, logger) => {
  const query = 'SELECT comment_id, story_id, username, comment_text, created_at FROM jungleBlog.comments ORDER BY created_at';
  await universalController(req, res, logger, query);
};

const getCommentsByStoryId = async (req, res, logger) => {
  const urlParams = getParamsFromUrl(req.url);
  const storyId = getStoryIdFromUrl(urlParams.pathname);
  if (isBadId(storyId)) {
    res.writeHead(400);
    return res.end(`Invalid story id in getting comments, id = "${storyId}"`);
  }
  const starPos = +urlParams.searchParams.get('start');
  const endPos = +urlParams.searchParams.get('end');
  let query = `SELECT comment_id, username, comment_text, created_at FROM jungleBlog.comments WHERE story_id=${storyId} ORDER BY created_at DESC`;
  if (!!starPos && !isNaN(starPos)) query += ` OFFSET ${starPos}`;
  if (!!endPos && !isNaN(endPos)) query += ` LIMIT ${endPos - starPos}`;
  await universalController(req, res, logger, query);
};

const createComment = async (req, res, logger, body) => {
  const storyId = body.story_id;
  if (isBadId(storyId)) {
    res.writeHead(400);
    return res.end(`Invalid story id, id = "${storyId}"`);
  }
  const queryData = [body.story_id, body.username, body.comment_text];
  const query = 'INSERT INTO jungleblog.comments(story_id, username, comment_text) VALUES ($1, $2, $3) RETURNING username, comment_text, created_at, story_id';
  await universalController(req, res, logger, query, 201, queryData);
};

const deleteComment = async (req, res, logger, body, cookies) => {
  if (!isUserLogined(cookies)) {
    res.writeHead(401);
    return void res.end('Not authorised');
  }
  const commentId = body.comment_id;
  if (isBadId(commentId)) {
    res.writeHead(400);
    return res.end(`Invalid comment id, id = "${commentId}"`);
  }
  const query = `DELETE FROM jungleblog.comments WHERE comment_id = ${commentId} RETURNING story_id`;
  await universalController(req, res, logger, query, 204);
};

module.exports = { getAllComments, getCommentsByStoryId, createComment, deleteComment };