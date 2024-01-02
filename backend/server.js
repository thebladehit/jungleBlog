'use strict';

require('dotenv').config();
const http = require('node:http');
const path = require('node:path');
const { PORT } = require('./config/config.js');
const { Logger } = require('./logger/logger.js');
const { cacher } = require('./cacher/cacherSingleton.js');
const { staticController } = require('./controllers/static.js');
const { getStories, getStory } = require('./controllers/story.js');
const { getAllComments, getCommentsByStoryId, createComment, deleteComment, updateComment } = require('./controllers/comment.js');

let logger;

const routing = {
  '/story': { GET: getStories},
  '/story/.*': { GET: getStory },
  '/comment': { 
    GET: getAllComments,
    POST: createComment,
    DELETE: deleteComment,
    PATCH: updateComment
  },
  '/comment/.*': { GET: getCommentsByStoryId }
};

const bodyParser = async (req) => {
  const data = [];
  for await (const chunk of req) {
    data.push(chunk);
  }
  const stringData = Buffer.concat(data).toString();
  if (!stringData) return;
  return JSON.parse(stringData);
}

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
  const cache = cacher.getCache(req.url);
  if (cache) {
    res.writeHead(200, { 'Content-Type': cache.mimeType });
    return void res.end(cache.data)
  };
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
    const controller = methods[req.method];
    if (controller) return void controller(req, res, logger, body);
    res.writeHead(400);
    res.end('No such path');
  }
});

server.listen(PORT, async () => {
  logger = await new Logger(path.resolve(__dirname, 'logs', 'server'));
  console.log(`Starting on ${PORT}...`);
});