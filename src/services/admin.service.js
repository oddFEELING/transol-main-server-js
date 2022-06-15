const Admin = require('../database/models/admin/admin.model');

/**
 * Admin service class
 * Handles all user services
 * @category Services
 * @example <caption>Creating a new admin</caption>
 * // calling in user.controller.js
 * const admin_service = require('path/to/admin_service.js')
 *
 * const adminData = req.body
 * const newAdmin = await admin_service.CREATE(adminData)
 * res.status(201).send(newAdmin)
 */
class admin_service {
  /**
   * Creates a new admin
   * @method
   * @param {Objcet} adminData - New admin data
   * @returns {Admin}
   */
  async CREATE(adminData) {
    const newAdmin = await Admin.create(adminData);
    return newAdmin;
  }

  /**
   * Gets all admins (no params needed)
   * @returns  {Admin[]}
   */
  async GET() {
    const allAdmin = await Admin.find({}).lean();
    return allAdmin;
  }

  /**
   *  Gets a single user by ID
   * @param {OjectId} adminId - ID of single admin to be fetched
   * @returns {Admin}
   */
  async GET_BY_ID(adminId) {
    const singleAdmin = await Admin.findById(adminId);
    return singleAdmin;
  }

  /**
   * Updates all users
   * @param {Object} updateData - Object containing fields to be updated for all admins
   * @returns {Object} status object for the update operation
   */
  async UPDATE(updateData) {
    const updateStats = await Admin.updateMany(
      {},
      { $set: updateData },
      { new: true }
    );
    return updateStats;
  }

  /**
   *
   * @param {ObjectId} adminId - ID of admin to be updated
   * @param {Object} updateData - Object containing fields to be edited
   * @returns {Admin}
   */
  async UPDATE_BY_ID(adminId, updateData) {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateData },
      { new: true }
    );
    return updatedAdmin;
  }

  /**
   *
   * @param {ObjectId} adminId - ID of admin to be deletd
   * @returns {Admin}
   */
  async DELETE(adminId) {
    const deleteStats = await Admin.findByIdAndDelete(adminId);
    return deleteStats;
  }
}

module.exports = new admin_service();
