const userService = require('../services/user.service');
const CustomError = require('../utils/customError.utils');
const { log } = require('../utils/customLogger.utils');

/**
 * User controller for route handling
 * @category Controllers
 * @example <caption>Using the controller for sample route</caption>
 * const user_ctrl = require('path/to/controller')
 *
 * const UserRoute = express.Router()
 * UserRoute
 * .route('/api/users')
 * .use(user_ctrl.CREATE)
 */
class user_ctrl {
  /**
   *
   * @param {req} req - request Object
   * @param {res} res - response Object
   * @returns Newly created user
   */
  async CREATE(req, res) {
    const userData = req.body;
    const queryData = await userService.CREATE(userData);
    log.data(queryData);
    res.created(queryData, 'New user');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns List of all users
   */
  async GET(req, res) {
    const queryData = await userService.GET();
    res.found(queryData, 'All users');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns Single user by ID
   */
  async GET_BY_ID(req, res, next) {
    const userId = req.params.id;
    const queryData = await userService.GET_BY_ID(userId);

    // ======= check for null data -->
    queryData === null
      ? next(new CustomError(`No user found with ID ${userId}`, 404))
      : res.found(queryData, `User with id ${userId || null}`);
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns update stats of all users
   */
  async UPDATE(req, res) {
    const updateData = req.body;
    const queryData = await userService.UPDATE(updateData);
    res.updated(queryData, 'All users');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns Updated user
   */
  async UPDATE_BY_ID(req, res) {
    const userId = req.params.id;
    const updateData = req.body;
    const queryData = await userService.UPDATE_BY_ID(userId, updateData);
    res.updated(queryData, 'Single user');
  }

  /**
   *
   * @param {*} req - request Object
   * @param {*} res - Response Object
   * @returns Delete details of deleted user
   */
  async DELETE(req, res, next) {
    const userId = req.params.id;
    const queryData = await userService.DELETE(userId);

    // ======= check if delete count is more than 0 -->
    queryData === null
      ? next(new CustomError('No found document to be deleted', 404))
      : res.deleted(queryData, userId || 'Single user');
  }

  async REPAIR_REQUEST(req, res) {
    const UserId = req.params.id;
  }
}

module.exports = new user_ctrl();
