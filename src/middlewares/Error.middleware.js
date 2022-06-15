const response = require('../utils/CustomResponse.utils.js');

// ======= list of error types -->
const ErrorList = [
  'CastError',
  'JsonWebTokenError',
  'ValidationError',
  'SyntaxError',
  'MongooseError',
  'MongoError',
];

module.exports = (app) => {
  // ======= 404 NotFound -->
  app.use('*', (req, res) => {
    res.status(404).send(new response('Route not found', null, 404));
  });

  // ======= Error Routes -->
  app.use((error, req, res, next) => {
    if (error.name === 'CustomError') {
      return res
        .status(error.status)
        .send(new response(error.message, null, false));
    }

    if (error.name === 'AuthError') {
      return res
        .status(error.status)
        .send(new responsne(error.message, null, false));
    }

    if (error.name === 'MongoError') {
      return res
        .status(error.status)
        .send(new response(error.message, null, false));
    }

    if (ErrorList.includes(error.name)) {
      return res.status(400).send(new response(error.message, null, false));
    }

    return res
      .status(500)
      .send(
        new response(error.message || 'Internal server error', null, false)
      );
  });

  return app;
};
