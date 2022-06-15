const Mechanic = require('../database/models/mechanic.model');

/**
 * Mechanic service class
 * Handles all Mechanic services
 * @category Services
 * @example <caption>Creating a new mechanic</caption>
 * // calling in mechanic.controller.js
 * const mechanic_service = require('path/to/mechanic_service.js')
 *
 * const mechanicData = req.body
 * const newmechanic = await mechanic_service.CREATE(mechanicData)
 * res.status(201).send(newMechanic)
 */
class mechanic_service {
  /**
   * Creates a new mechanic
   * @param {Objcet} mechanicData - New User data
   * @returns {Mechanic}
   */
  async CREATE(mechanicData) {
    const newMechanic = await Mechanic.create(mechanicData);
    return newMechanic;
  }

  /**
   * Gets all mechanics (no params needed)
   * @returns  {Mechanic[]}
   */
  async GET() {
    const allMechanics = await Mechanic.find({}).lean();
    return allMechanics;
  }

  /**
   *  Gets a single user by ID
   * @param {String} mechId - ID of single mechanic to be fetched
   * @returns {Mechanic}
   */
  async GET_BY_ID(mechId) {
    const mech = await Mechanic.findById(mechId);
    return mech;
  }

  /**
   * Updates all users
   * @param {Object} updateData - Object containing fields to be updated for all mechanics
   * @returns {Mechanic}
   */
  async UPDATE(updateData) {
    const updatedMech = await Mechanic.updateMany(
      {},
      { $set: updateData },
      { new: true }
    );
    return updatedMech;
  }

  /**
   *
   * @param {String} mechId - ID of mechanic to be updated
   * @param {Object} updateData - Object containing fields to be edited
   * @returns {Mechanic}
   */
  async UPDATE_BY_ID(updateData, mechId) {
    const updatedMech = await Mechanic.findOneAndUpdate(
      { _id: mechId },
      { $set: updateData },
      { new: true }
    );
    return updatedMech;
  }

  /**
   *
   * @param {String} mechId - ID of mechanic to be deletd
   * @returns {Mechanic}
   */
  async DELETE(mechId) {
    const deletedMech = await Mechanic.findByIdAndDelete(mechId);
    return deletedMech;
  }
}

module.exports = new mechanic_service();
