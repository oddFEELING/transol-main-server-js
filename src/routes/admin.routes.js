const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler.utils');
const adminController = require('../controllers/admin.controller');

const AdminRoutes = Router();

AdminRoutes.route('/admins')
  .get(asyncHandler(adminController.GET))
  .post(asyncHandler(adminController.CREATE))
  .patch(asyncHandler(adminController.UPDATE));

AdminRoutes.route('/admins/:id')
  .get(asyncHandler(adminController.GET_BY_ID))
  .patch(asyncHandler(adminController.UPDATE_BY_ID))
  .delete(asyncHandler(adminController.DELETE));

module.exports = AdminRoutes;
