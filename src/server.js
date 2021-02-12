//todo: A server to receive and send data
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const AuthedUser = require('../db');
const Message = require('./message.js');

const {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT
} = require('../config.js');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

app.get('/oauth', (req, res) => {
  if (!req.query.code) {
    res.status(500);
    res.send({ "Error": "No code found." });
    console.log("No code found.");
  } else {
    const params = new URLSearchParams();
    params.append('code', req.query.code);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    fetch('https://slack.com/api/oauth.v2.access', {
      body: params,
      method: 'POST',
    })
    .then(response => response.json())
    .then(json => {
      const { authed_user, team } = json;
      const user = new AuthedUser(
        team.id,
        authed_user.id,
        authed_user.access_token,
        json.access_token // This is the bot token
      );
      user.getDatabase();
      user.getTable();
      user.getToken('bot', user.bot_token);
      user.getToken();
      res.send(json);
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const urlencodedParser = express.urlencoded({ extended: false });

app.post('/message', urlencodedParser, function (req, res) {
  const {
    team_id,
    user_id,
    channel_id,
    channel_name,
    text
  } = req.body;

  const message = new Message(team_id, user_id, channel_id, channel_name, text);
  message.getDatabase();
  const userType = message.isPrivate() ? 'bot' : message.user_id;
  message.getToken(userType, '', user_id)
    .then((response) => {
      console.log(response);
      const { 
        access_token,
        display_name,
        image
      } = response;
      message.send(access_token, display_name, image);
    });

  res.send(`User said ${req.body.text}`);
});

app.listen(PORT, () => console.log(`Emojiq app listening at http://localhost:${PORT}`));
