const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
};

module.exports = env;
