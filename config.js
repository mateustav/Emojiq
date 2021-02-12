require('dotenv').config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  PGHOST,
  PGDATABASE,
  PGUSERNAME,
  PGPORT,
  PGPASSWORD,
} = process.env;

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  PGHOST,
  PGDATABASE,
  PGUSERNAME,
  PGPORT,
  PGPASSWORD
};