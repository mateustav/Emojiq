const fs = require('fs');
const fetch = require('node-fetch');

const overwrites = require('./lib/overwritten-emojis.json');
const customKeywords = require('./lib/custom-keywords.json');

const PRIMARY_LIB_URL = 'https://raw.githubusercontent.com/mateustav/emoji-data/master/emoji.json';
const ALT_LIB_URL = 'https://raw.githubusercontent.com/mateustav/emojilib/master/emojis.json';

function overrideEmojis({json, name}) {
  const short_names = {};
  for (let emoji of json) {
    let unicode = emoji.non_qualified;
    if (overwrites[unicode]) emoji.short_name = overwrites[unicode];
    short_names[unicode] = emoji.short_name;
  }
  createFile(short_names, name);
}

function addCustomKeywords({json, name}) {
  //find if emoji is in custom keywords
  const emoji_names = Object.keys(json);
  for (let emoji_name of emoji_names) {
    if (customKeywords[emoji_name]) {
      console.log(customKeywords[emoji_name]);
      json[emoji_name].keywords = json[emoji_name].keywords.concat(customKeywords[emoji_name]);
    }
  }
  createFile(json, name);
}

function createFile(data, file_name) {
  fs.writeFile(
    `lib/${file_name}.json`,
    `${JSON.stringify(data, null, 2)}`,
    'utf8',
    (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }
  );
}

async function getEmojiList(url, name) {
	const response = await fetch(url);
  const json = await response.json();
  return {json, name};
}

getEmojiList(PRIMARY_LIB_URL, 'emojis')
  .then(overrideEmojis);

getEmojiList(ALT_LIB_URL, 'emojilib')
  .then(addCustomKeywords);
