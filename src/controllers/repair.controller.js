const CustomError = require('../utils/customError.utils');
const { log } = require('../utils/customLogger.utils');
const repairService = require('../services/repair.service');

class repair_ctrl {
  async CREATE(req, res) {
    const repairData = req.body;
    const newRepair = await repairService.CREATE(repairData);
    res.created(newRepair, 'new repair');
  }

  async GET(req, res) {
    const queryData = await repairService.GET;
    res.found(queryData, 'All repairs');
  }

  async GET_BY_ID(req, res) {
    const repairId = req.params.id;
    const queryData = await repairService.GET_BY_ID(repairId);
    res.found(queryData, 'Single repair');
  }

  async UPDATE(req, res) {
    const updateData = req.body;
    const queryData = await repairService.UPDATE(updateData);
    res.updated(queryData, 'all repairs');
  }

  async UPDATE_BY_ID(req, res) {
    const stateData = req.body;
    const query = await repairService.UPDATE(stateData);
    res.updated(query, 'single repair');
  }

  async DELETE(req, res) {
    const repairId = req.params.id;
    const queryData = await repairService.DELETE(repairId);
    res.deleted(queryData, 'single repair');
  }
}

module.exports = new repair_ctrl();
