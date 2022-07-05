const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const { randomUUID } = require('crypto');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { log } = require('../utils/customLogger.utils');
const { SESSION_SECRET, MONGO_URL } = require('../config/env.config');
const { url } = require('inspector');

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
  app.use(express.json());
  app.use(morgan('[:status] :method :url'));
  app.use(
    session({
      resave: false,
      secret: SESSION_SECRET,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
      store: MongoStore.create({
        mongoUrl: MONGO_URL,
      }),
      genid: (req) => randomUUID(),
    })
  );

  return app;
};

module.exports = pre_route;
