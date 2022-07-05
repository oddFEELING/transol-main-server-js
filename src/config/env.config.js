const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

module.exports = env;
