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
    log.info(`New connection :::> ${socket}`);

    socket.on('start-repair', (data) =>
      console.log(`${socket.id} started event: ${data.event}`)
    );
    socket.on('end-repair', (data) =>
      console.log(`${socket.id} started event: ${data.event}`)
    );
  });

  //=============================================>
  app.set('socketio', io);
  return { server };
};

module.exports = socketConnect;
