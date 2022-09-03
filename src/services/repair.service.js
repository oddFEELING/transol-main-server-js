const Repair = require('../database/models/repair.model');
/**
 * Repair service class
 * Handles all Repair Logic
 * @category Services
 * @example <caption>Creating a new Repair</caption>
 * // calling in mechanic.controller.js
 * const repair_service = require('path/to/repair_service.js')
 *
 * const repairData = req.body
 * const newRepair = await mechanic_service.CREATE(repairData)
 * res.status(201).send(newRepair)
 */
class repair_service {
  /**
   * Creates a new repair
   * @param {Object} repairData - New repair data
   * @returns {Repair}
   */
  async CREATE(repairData) {
    const newRepair = await Repair.create(repairData).lean();
    return newRepair;
  }

  /**
   * Gets all repairs
   * @returns {Repair[]}
   */
  async GET() {
    const repairList = await Repair.find({}).lean();
    return repairList;
  }

  /**
   * Gets single repair
   * @param {String} repairId - Id of repair to be fetched
   * @returns {Repair}
   */
  async GET_BY_ID(repairId) {
    const repairList = await Repair.find({ _id: repairId }).lean();
    return repairList;
  }

  /**
   * Change state of repair
   * @param {Object} stateData - update object of the repair structure should be {id: ...repair id, data: ...data to be updated}
   * @param {String} stateData.id - id of repair to be updated
   * @param {Object} stateData.data - data to be updated
   * @returns {Repair}
   */
  async UPDATE_BY_ID(updateData) {
    const { id, data } = updateData;
    const updatedRepair = await Repair.updateOne(
      { _id: id },
      { $set: { ...data } },
      { new: true }
    );
    return updatedRepair;
  }
}

module.exports = new repair_service();
