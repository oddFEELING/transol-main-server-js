const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { log } = require('../utils/customLogger.utils');

/**
 * Used to apply all pre-route middlewares
 *
 * @constructor
 * @category Middlewares
 * @param {*} app - Instance of express app
 *
 * @property {middleware} cors - For Cross origin resource sharing
 * @property {Middleware} helmet - For Basic http method security
 * @property {Middleware} morgan - For logging API call info
 * @property {Middleware} express.json - For parsing JSON objects in request body
 *
 * @returns {void}
 * @example <caption>Usage</caption>
 * const App = express() // express app instance
 * pre_route(App) // Wrap app in pre_route to apply middlewares
 */
const pre_route = (app) => {
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

module.exports = pre_route;
