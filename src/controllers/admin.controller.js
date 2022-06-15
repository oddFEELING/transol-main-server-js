const adminService = require('../services/admin.service');
const CustomError = require('../utils/customError.utils');

/**
 * Admin controller for admin routes
 * @category Controllers
 * @example <caption>Using the controller for sample route</caption>
 * const admin_ctrl = require('path/to/controller')
 *
 * const AdminRoute = express.Router()
 * AdminRoute
 * .route('/api/admins')
 * .use(admin_ctrl.CREATE)
 *
 */
class admin_ctrl {
  /**
   *
   * @param {req} req - request Object
   * @param {res} res - response Object
   * @returns Newly created admin
   */
  async CREATE(req, res) {
    const adminData = req.body;
    const queryData = await adminService.CREATE(adminData);
    res.created(queryData, 'New Admin');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns List of all admins
   */
  async GET(req, res) {
    const queryData = await adminService.GET();
    res.found(queryData, 'All Admins');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns Single admin by ID
   */
  async GET_BY_ID(req, res, next) {
    const adminId = req.params.id;
    const queryData = await adminService.GET_BY_ID(adminId);

    // ======= check for null data -->
    queryData === null
      ? next(new CustomError(`No found admin wih ID ${adminId}`, 404))
      : res.found(queryData, 'Single admin');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns update stats of all admins
   */
  async UPDATE(req, res) {
    const updateData = req.body;
    const queryData = await adminService.UPDATE(updateData);
    res.updated(queryData, 'All admnins');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns updated admin
   */
  async UPDATE_BY_ID(req, res) {
    const adminId = req.params.id;
    const updateData = req.body;
    const queryData = await adminService.UPDATE_BY_ID(adminId, updateData);
    res.updated(queryData, 'Single Admin');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns Delete details of deleted admin
   */
  async DELETE(req, res, next) {
    const adminId = req.params.id;
    const queryData = await adminService.DELETE(adminId);

    // ======= Check if delecet count is above 0 -->
    queryData === null
      ? next(new CustomError('No found document to delete', 404))
      : res.deleted(queryData, 'Single Admin');
  }
}

module.exports = new admin_ctrl();
