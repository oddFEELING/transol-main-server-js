const mechanicService = require('../services/mechanic.service');
const CustomError = require('../utils/customError.utils');
const { log } = require('../utils/customLogger.utils');

/**
 * Mechanic controller for route handling
 * @category Controllers
 * @example <caption>Using the controller for sample route</caption>
 * const mechanic_contrl = require('path/to/controller')
 *
 * const MechanicRoute = express.Router()
 * MechanicRoute
 * .route('api/mechanic')
 * .use(mechanic_ctrl)
 */
class mechanic_ctrl {
  /**
   *
   * @param {*} req - request object
   * @param {*} res - response Object
   * @returns Newly created Mechanic
   */
  async CREATE(req, res) {
    const mechData = req.body;
    const queryData = await mechanicService.CREATE(mechData);
    log.data(queryData);
    res.created(queryData, 'New mechanic');
  }

  /**
   *
   * @param {*} req - request object
   * @param {*} res - response Object
   * @returns List of all Mechanics
   */
  async GET(req, res) {
    const queryData = await mechanicService.GET();
    res.found(queryData, 'All mechanics');
  }

  /**
   *
   * @param {*} req - request object
   * @param {*} res - response Object
   * @returns Single Mechanic by ID
   */
  async GET_BY_ID(req, res, next) {
    const mechId = req.params.id;
    const queryData = await mechanicService.GET_BY_ID(mechId);

    // ======= check for null data -->
    queryData === null
      ? next(new CustomError(`No Mechanic found with ID ${mechId}`, 404))
      : res.found(queryData, 'Single mechanic');
  }

  /**
   *
   * @param {*} req - request object
   * @param {*} res - response Object
   * @returns Update details of all mechanics
   */
  async UPDATE(req, res) {
    const updateData = req.body;
    const queryData = await mechanicService.UPDATE(updateData);
    res.updated(queryData, 'All mechanic');
  }

  /**
   *
   * @param {*} req - request object
   * @param {*} res - response Object
   * @returns Update detail of single mechanic
   */
  async UPDATE_BY_ID(req, res, next) {
    const updateData = req.body;
    const mechId = req.params.id;
    const queryData = await mechanicService.UPDATE_BY_ID(updateData, mechId);

    // ======= check for null data -->
    queryData === null
      ? next(new CustomError('No found document to be updated', 404))
      : res.updated(queryData, mechId || 'Single mechanic');
  }

  /**
   *
   * @param {*} req - request object
   * @param {*} res - response Object
   * @returns Delete details for single mechanic
   */
  async DELETE(req, res, next) {
    const mechId = req.params.id;
    const queryData = await mechanicService.DELETE(mechId);

    // ======= check if delete count is more than 0 -->
    queryData == null
      ? next(new CustomError('No found document to be deleted', 404))
      : res.deleted(queryData, mechId || 'Single mechanic');
  }
}

module.exports = new mechanic_ctrl();
