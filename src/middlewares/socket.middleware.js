const http = require('http');
const socketIO = require('socket.io');
const { log } = require('../utils/customLogger.utils');

/**
 * A middleware to handle socket connections and real time interaction
 * @category Middlewares
 * @param {App} app - Express app in which sessions would be created
 * @returns
 */
const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIO(server, { cors: { origin: '*' } });

  //=============================================>
  io.on('connection', (socket) => {
    log.info(`User: ${socket.id} [Connected]`);
  });
  //=============================================>
  return { server, io };
};

module.exports = socketConnect;
