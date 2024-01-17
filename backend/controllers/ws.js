'use strict';

const WebSocket = require('ws');

const msgTypes = {
  newComment: (recieveData) => JSON.stringify({ msgType: 'reloadComments', data: { storyId: recieveData.storyId }}),
  newPost: () => JSON.stringify({ msgType: 'reloadPosts' }),
  newFeedback: () => JSON.stringify({ msgType: 'reloadFeedbacks' })
};

const wsController = (ws, logger) => {
  ws.on('connection', (connection) => {
    connection.on('error', logger.error);
    connection.on('message', (msg) => {
      try {
        msg = JSON.parse(msg);
        const message = msgTypes[msg.msgType](msg.data);
        for (const client of ws.clients) {
          if (client.readyState === WebSocket.OPEN) client.send(message, { binary: false });
        }
      } catch (err) {
        logger.error(err);
      }
    });
  });
};

module.exports = { wsController };