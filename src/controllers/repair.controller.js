const { log } = require('../utils/customLogger.utils');

class repair_ctrl {
  async CREATE(req, res) {
    const socket = req.app.get('current_socket');
    let queryData;
    socket.on('start-repair', (data) => (queryData = data));
    res.created(queryData, 'new request');
  }
}
