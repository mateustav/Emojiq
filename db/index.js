const { Client } = require('pg');

require('dotenv').config();

const client = new Client();
client.connect();


const fetch = require('node-fetch');

class AuthedUser {
  constructor(team, user, access_token, bot_token) {
    this.access_token = access_token;
    this.bot_token = bot_token;
    this.team = team;
    this.user = user;
  }

  getDatabase() {
    connection.query(`
    CREATE DATABASE IF NOT EXISTS ${this.team}
    DEFAULT CHARACTER SET utf8mb4;
  `);
    connection.query(`USE ${this.team};`);
  }

  getTable() {
    connection.query(`
      CREATE TABLE IF NOT EXISTS tokens(
        id INT NOT NULL AUTO_INCREMENT,
        user VARCHAR(55) NOT NULL,
        access_token VARCHAR(250) NOT NULL,
        display_name TEXT NULL,
        image VARCHAR(250) NULL,
        PRIMARY KEY (id)
      );`
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
        const user = response.user.id;
        const { display_name, image_72 } = response.user.profile;
        connection.query(`
          UPDATE tokens
            SET
              display_name = "${display_name}",
              image = "${image_72}"
            WHERE user = "${user}"
        `);
      });

  }

  addToken(type = this.user, token = this.access_token) {
    connection.query(`
      INSERT INTO tokens (user, access_token)
      VALUES ('${type}', '${token}')`, (err) => {
        if (err) { reject(err); throw err; }
        this.getUserNameAndPhoto(type, token);
      });
  }

  getToken(type = this.user, token, user_id = this.user) {
    const that = this;
    return new Promise(function (resolve, reject) {
      connection.query(`
      SELECT access_token FROM tokens WHERE user = ?`, type,
      (err, result) => {
        if (err) {
          reject(err); throw err;
        }
        if (!result.length) {
          that.addToken(type, token);
        }
        else {
          connection.query(`
            SELECT display_name, image FROM tokens WHERE user = ?`, user_id, (err, user_data) => {
              if (!user_data.length) user_data[0] = {};
              const display_name = user_data[0].display_name;
              const image = user_data[0].image;
              result[0].display_name = display_name;
              result[0].image = image;
              resolve(result);
            });
        }
      });
    });
  }
}

module.exports = AuthedUser;
