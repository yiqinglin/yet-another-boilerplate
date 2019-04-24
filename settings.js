require('dotenv').config();

module.exports = {
  APP_ROOT: __dirname,
  APP_PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo/app'
};