'use strict';

require('dotenv').config();
const http = require('node:http');
const path = require('node:path');
const { Logger } = require('./logger/logger.js');
const { PORT } = require('./config/config.js');
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
    UPDATE: updateComment
  },
  '/comment/.*': { GET: getCommentsByStoryId }
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
    const controller = methods[req.method];
    if (controller) return void controller(req, res, logger);
    res.writeHead(400);
    res.end('No such path');
  }
});

server.listen(PORT, async () => {
  logger = await new Logger(path.resolve(__dirname, 'logs'));
  console.log(`Starting on ${PORT}...`);
});