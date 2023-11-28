'use strict';

require('dotenv').config();
const http = require('node:http');
const path = require('node:path');
const { Logger } = require('./logger/logger.js');
const { PORT } = require('./config/config.js');
const { staticController } = require('./controllers/static.js');
const { getStories, getStory } = require('./controllers/story.js');

let logger;

const routing = {
  '/story': getStories,
  '/story/.*': getStory
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
  let controller = routing[req.url];
  if (!controller) {
    for (const rx of rxRouting) {
      if (req.url.match(rx[0])) {
        controller = rx[1];
      }
    }
  }
  if (!controller) controller = staticController;
  controller(req, res, logger);
});

server.listen(PORT, async () => {
  logger = await new Logger(path.resolve(__dirname, 'logs'));
  console.log(`Starting on ${PORT}...`);
});