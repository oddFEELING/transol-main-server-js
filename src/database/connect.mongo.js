const mongoose = require('mongoose');
const { log } = require('../utils/customLogger.utils');
const env = require('../config/env.config');

const mongoConnect = async () => {
  log.info('Trying mongo connection...');

  mongoose.connect(
    env.MONGO_URL,
    {
      keepAlive: true,
      connectTimeoutMS: 60000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      //   prettier-ignore
      error
              ? log.error(error.message)
              : log.success('Database plugged in!')
    }
  );
};

module.exports = mongoConnect;
