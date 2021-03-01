const { Client } = require('pg');

require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CACERT,
  }
});
client.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));


const fetch = require('node-fetch');

class AuthedUser {
  constructor(team, user, access_token, bot_token) {
    this.access_token = access_token;
    this.bot_token = bot_token;
    this.team = team;
    this.user = user;
  }


  // getDatabase() {
  //   const { team } = this;
  //   client.query(
  //     `CREATE SCHEMA IF NOT EXISTS ${team};`, (err, res) => {
  //     if (err) console.log(err.stack);
  //   });

  //   client.query(`SET search_path TO ${team};`, (err, res) => {
  //     if (err) console.log(err.stack);
  //   });
  // }

  getTable() {
    client.query(`
      CREATE TABLE IF NOT EXISTS tokens(
        id SERIAL PRIMARY KEY,
        "user" VARCHAR(55) NOT NULL,
        access_token VARCHAR(250) NOT NULL,
        display_name TEXT NULL,
        image VARCHAR(250) NULL
      );`, (err, res) => {
        if (err) console.log(err.stack);
      }
    );
  }

  getUserNameAndPhoto(user, token) {
    fetch(`https://slack.com/api/users.info?user=${user}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          const user = response.user.id;
          const { display_name, image_72 } = response.user.profile;
          client.query(`
            UPDATE tokens
              SET
                display_name = $1,
                image = $2
              WHERE "user" = $3
          `, [display_name, image_72, user], (err, res) => {
            if (err) console.log(err.stack);
          });
        }
      });

  }

  addToken(type = this.user, token = this.access_token) {
    client.query(`
      INSERT INTO tokens ("user", access_token)
      VALUES ($1, $2)`, [type, token], (err) => {
        if (err) { throw err; }
        this.getUserNameAndPhoto(type, token);
      });
  }

  getToken(type = this.user, token, user_id = this.user) {
    const that = this;
    return new Promise(function (resolve, reject) {
      client.query(`
      SELECT access_token FROM tokens WHERE "user" = $1`, [type],
      (err, result) => {
        if (err) console.log(err.stack);
        if (!result.rowCount) {
          that.addToken(type, token);
        }
        else {
          client.query(`
            SELECT display_name, image FROM tokens WHERE "user" = $1`, [user_id], (err, user_data) => {
              if (!user_data.rows.length) user_data[0] = {};
              const display_name = user_data.rows[0].display_name;
              const image = user_data.rows[0].image;
              result.rows[0].display_name = display_name;
              result.rows[0].image = image;
              resolve(result.rows[0]);
            });
        }
      });
    });
  }
}

module.exports = AuthedUser;
