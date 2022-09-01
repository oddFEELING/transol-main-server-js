const CustomError = require('../utils/customError.utils');
const { log } = require('../utils/customLogger.utils');

class repair_ctrl {
  async CREATE(req, res) {
    const socket = req.app.get('current_socket');

    socket.once('start-repair', (data) => {
      console.log(data);
    });
    res.status(200).send('route Hit normally');
  }
}
module.exports = new repair_ctrl();

// user clicks on request repair ---- client-emit
// create new repair object ---- server-action
// add id of new repair to user repair history ---- server-action
// get closest 5 mechanics ---- server-action
// send request to selected mechanic ---- server-emit
// mechanic accepts request ---- client-emit
// mecahnic is added to repair object ---- server-action
