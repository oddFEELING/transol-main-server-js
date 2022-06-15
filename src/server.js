const express = require('express');
const env = require('./config/env.config');
const v1 = require('./version/v1.version.js');
const { log } = require('./utils/customLogger.utils');
const mongoConnect = require('./database/connect.mongo');
const ErrorHandler = require('./middlewares/Error.middleware');
const CustomResponse = require('./utils/CustomResponse.utils');
const pre_route = require('./middlewares/pre_route.middleware');
const socketConnect = require('./middlewares/socket.middleware');

const app = express();

// ======= use pre-routes -->
pre_route(app);

app.get('/', (req, res) => {
  res.status(200).json(
    new CustomResponse(
      'Transol Backend versionless root route',
      {
        status: 200,
        state: 'Running',
        route: '/',
      },
      true
    )
  );
});

app.use('/api/v1', v1);

// ======= error handler middleware -->
ErrorHandler(app);

// ======= add socket middleware -->
const { server, io } = socketConnect(app);

server.listen(env.PORT || 8080, (error) => {
  //  prettier-ignore
  if (error) return log.error('Failed to start up server')

  log.success('Server started successfully');
  // ======= try Database connection -->
  mongoConnect();
});

// ======= In case of unhandled and uncaught errors -->
process.on('uncaughtException', (error) => {
  log.warn(`unCaught Exception ::: ${error.message}`);
});

process.on('unhandledRejection', (error) => {
  log.warn(`unHandled Rejection ::: ${error.message}`);
});
