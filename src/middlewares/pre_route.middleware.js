const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { log } = require('../utils/customLogger.utils');

/**
 * Used to apply all pre-route middlewares
 *
 * @function
 * @param {*} app - Instance of express app
 * @returns {void}
 */
module.exports = function (app) {
  // ======= check for pap -->
  if (!app)
    return log.warn(
      `!! Pre-Route middleware expects expess app instance as prameter but got nothing`
    );

  app.use(cors());
  app.use(helmet());
  app.use(morgan('[:status] :method :url'));
  app.use(express.json());

  return app;
};
