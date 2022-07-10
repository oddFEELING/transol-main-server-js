const http = require('http');
const socketIO = require('socket.io');
const { log } = require('../utils/customLogger.utils');

/**
 * A middleware to handle socket connections and real time interaction
 * @category Middlewares
 * @param {App} app - Express app in which sessions would be created
 * @returns {Object} HTTP server
 */
const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIO(server, { cors: { origin: '*' } });

  //=============================================>
  io.on('connection', (socket) => {
    app.set('current_socket', socket);
    log.info(`New connection :::> ${socket.id}`);

    socket.on('start-repair', (data) =>
      log.data(`${socket.id} triggered event: ${data.event}`)
    );
    socket.on('end-repair', (data) =>
      log.data(`${socket.id} triggered event: ${data.event}`)
    );
  });

  //=============================================>
  app.set('socketio', io);
  return { server };
};

module.exports = socketConnect;
