const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler.utils');
const userController = require('../controllers/user.controller');

const UserRoutes = Router();

UserRoutes.route('/users')
  .get(asyncHandler(userController.GET))
  .post(asyncHandler(userController.CREATE))
  .patch(asyncHandler(userController.UPDATE));

UserRoutes.route('/users/:id')
  .get(asyncHandler(userController.GET_BY_ID))
  .delete(asyncHandler(userController.DELETE))
  .patch(asyncHandler(userController.UPDATE_BY_ID));

module.exports = UserRoutes;
