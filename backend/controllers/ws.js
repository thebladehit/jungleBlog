'use strict';

const wsController = (ws, logger) => {
  ws.on('connection', (connection, req) => {
    connection.on('error', logger.error);
    connection.on('message', (msg) => {});
  });
};

module.exports = { wsController };