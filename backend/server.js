'use strict';

require('dotenv').config();
const WebSocket = require('ws');
const http = require('node:http');
const path = require('node:path');
const { PORT } = require('./config/config.js');
const { Logger } = require('./logger/logger.js');
const { wsController } = require('./controllers/ws.js');
const { cacher } = require('./cacher/cacherSingleton.js');
const { staticController } = require('./controllers/static.js');
const { loginUser, checkLogin } = require('./controllers/login.js');
const { getFeedbacks, createFeedback } = require('./controllers/feedback.js');
const { getStories, getStory, updateStory } = require('./controllers/story.js');
const { getAllComments, getCommentsByStoryId, createComment, deleteComment } = require('./controllers/comment.js');

let logger;

const routing = {
  '/story': {
    GET: getStories,
    PATCH: updateStory
  },
  '/story/.*': { GET: getStory },
  '/comment': { 
    GET: getAllComments,
    POST: createComment,
    DELETE: deleteComment
  },
  '/comment/.*': { GET: getCommentsByStoryId },
  '/feedbacks': {
    GET: getFeedbacks,
    POST: createFeedback
  },
  '/login': {
    POST: loginUser,
    GET: checkLogin
  }
};

const bodyParser = async (req) => {
  const data = [];
  for await (const chunk of req) {
    data.push(chunk);
  }
  const stringData = Buffer.concat(data).toString();
  if (!stringData) return;
  return JSON.parse(stringData);
};

const cookiesParser = (req) => {
  if (!req.headers.cookie) return;
  const splited = req.headers.cookie.split(';');
  const cookies = {};
  for (const item of splited) {
    const [name, value] = item.trim().split('=');
    cookies[name] = value;
  }
  return cookies;
};

const rxRouting = [];
for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key);
    const route = routing[key];
    rxRouting.push([ rx, route ]);
    delete routing[key];
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return void res.end();
  }
  const cache = cacher.getCache(req.url);
  if (cache && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': cache.mimeType });
    return void res.end(cache.data);
  }
  let methods = routing[req.url];
  if (!methods) {
    for (const rx of rxRouting) {
      if (req.url.match(rx[0])) {
        methods = rx[1];
      }
    }
  }
  if (!methods) staticController(req, res, logger);
  else {
    const body = await bodyParser(req);
    const cookies = cookiesParser(req);
    const controller = methods[req.method];
    if (controller) return void controller(req, res, logger, body, cookies);
    res.writeHead(400);
    res.end('No such path');
  }
});

server.listen(PORT, async () => {
  logger = await new Logger(path.resolve(__dirname, 'logs', 'server'));
  const ws = new WebSocket.Server({ server });
  wsController(ws, logger);
  console.log(`Starting on ${PORT}...`);
});