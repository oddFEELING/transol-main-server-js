const { Router } = require('express');
const mechanicController = require('../controllers/mechanic.controller');
const asyncHandler = require('../utils/asyncHandler.utils');

const MechanicRoutes = Router();

MechanicRoutes.route('/mechanics')
  .get(asyncHandler(mechanicController.GET))
  .post(asyncHandler(mechanicController.CREATE))
  .patch(asyncHandler(mechanicController.UPDATE));

MechanicRoutes.route('/mechanics/:id')
  .get(asyncHandler(mechanicController.GET_BY_ID))
  .delete(asyncHandler(mechanicController.DELETE))
  .patch(asyncHandler(mechanicController.UPDATE_BY_ID));

module.exports = MechanicRoutes;
