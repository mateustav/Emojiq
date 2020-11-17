require('dotenv').config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  SQL_HOST,
  SQL_USER,
  SQL_PORT,
  SQL_PW,
} = process.env;

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  SQL_HOST,
  SQL_USER,
  SQL_PORT,
  SQL_PW
};