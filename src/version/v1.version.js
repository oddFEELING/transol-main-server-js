const express = require('express');
const AppRouter = require('../routes/router');
const CustomResponse = require('../utils/CustomResponse.utils');

const v1 = express.Router();

// prettier-ignore
v1
  .route('/')
  .get((req, res) => {
    res
      .status(200)
      .json(new CustomResponse('API version 1.0.0 root route', {
        status: 200,
        state: 'running',
        route: '/api/v1'
      }, true))
  })

v1.use(AppRouter);

module.exports = v1;
