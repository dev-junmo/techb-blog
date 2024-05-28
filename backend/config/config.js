const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}
