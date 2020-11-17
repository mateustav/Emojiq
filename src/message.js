const { AuthedUser } = require("../db");
const emojiPrimaryList = require('../lib/emojis.json');
const emojiAltList = require('../lib/emojilib.json');
const emojiUnicode = require('emoji-unicode');
const fetch = require('node-fetch');

class Message extends AuthedUser {
  constructor (team, user, channel, channel_type, text) {
    super(team, user);
    this.channel = channel;
    this.channel_type = channel_type
    this.text = text;
  }

  getType() {
    const lettersRegexp = /^--abc /;
    return [lettersRegexp, lettersRegexp.test(this.text) ? '' : ' '];
  }

  preFormattedText() {
    const text = this.text.replace(this.getType()[0], '');
    return text.toLowerCase().split(this.getType()[1]);
  }

  isCountryFlag(emoji_name) {
    return !emojiAltList[emoji_name]['keywords'].includes('flag');
  }

  getShortName(value, keyword) {
    let unicodedEmoji = emojiUnicode(value);
    console.log(value, keyword, unicodedEmoji);
    unicodedEmoji = unicodedEmoji.replace(' ', '-');
    unicodedEmoji = unicodedEmoji.toUpperCase();
    const shortName = emojiPrimaryList[unicodedEmoji];
    return shortName ? `:${shortName}:` : value;
  }

  getFromAltList(value) {
    const result = [];
    let matchFound;
    for (let emoji in emojiAltList) {
      if (matchFound) break;
      for (let keyword of emojiAltList[emoji]['keywords']) {
        if (this.isCountryFlag(emoji)) {
          if (keyword === value) {
            result.push(this.getShortName(emojiAltList[emoji].char, keyword));
            matchFound = true;
            break;
          }
        }
      }
    }
    if (!matchFound) result.push(`${value}${this.getType()[1]}`);
    return result;
  }

  getRemoji() {
    const short_names = Object.values(emojiPrimaryList);
    return this.preFormattedText().map((value) => {
      if (short_names.includes(value)) {
        return `:${value}:`
      }
      else {
        return this.getFromAltList(value);
      }
    }).join(this.getType()[1]);
  }

  isPrivate() {
    return /^(private)/.test(this.channel_type);
  }

  send(access_token, display_name, image) {
    fetch('https://slack.com/api/chat.postMessage', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        method: 'POST',
        body: JSON.stringify({
          channel: this.channel,
          text: this.getRemoji(),
          username: display_name || 'Remoji',
          icon_url: image || 'http://lorempixel.com/48/48'
        })
      });
  }
}

module.exports = Message;