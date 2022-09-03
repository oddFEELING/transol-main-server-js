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
  io.sockets.setMaxListeners(0);

  //=============================================>
  io.on('connection', (socket) => {
    socket.join('active'); // room for active users
    app.set('current_socket', socket);
    log.info(`New connection :::> ${socket.id}`);
  });

  //=============================================>
  app.set('socketio', io);
  return { server };
};

module.exports = socketConnect;

// req.app.get('current_socket') gives the socket object at controller/middleware level
