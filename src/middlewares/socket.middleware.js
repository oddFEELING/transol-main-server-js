const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const { log } = require('../utils/customLogger.utils');
const { SESSION_SECRET } = require('../config/env.config');
const MongoStore = require('connect-mongo');

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
    app.set('current_socket', socket);
    log.info(`New user ::: ${socket.id}`);

    socket.on('start-repair', (data) => {
      log.info(`${socket.id} started a repair session`);
    });

    socket.on('end-repair', (data) => {
      log.data('The repair was ended in the user route');
    });

    socket.on('something', (data) => console.log(data));
  });

  //=============================================>
  app.set('socketio', io);
  return { server };
};

module.exports = socketConnect;
