const { Router } = require('express');
const repairController = require('../controllers/repair.controller');
const asyncHandler = require('../utils/asyncHandler.utils');

const repairRoutes = Router();

// prettier-ignore
repairRoutes.route('/repairs')
    .post(asyncHandler(repairController.CREATE));

module.exports = repairRoutes;
