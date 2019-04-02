/*
  name: wikiSummary
  author: Malte
  link on Telegram: https://t.me/getSummaryBot
*/

const Telegraf = require('telegraf');
const bot = new Telegraf('TOKEN');
const axios = require('axios');

bot.start((message) => {
  console.log('started:', message.from.id);
  return message.reply('Hey, send me a word and you will get back a summary from Wikipedia');
})

bot.on('text', message => {

  const summary = message.message.text;
  console.log('message:', summary);

  axios
    .get(`https://en.wikipedia.org/api/rest_v1/page/summary/${summary}`)

    .then( res => {
      var extr = res.data;
  	  if (res.length < 1)
        return message.reply("The search on wiki haven't results.");
  	  console.log(`https://en.wikipedia.org/api/rest_v1/page/summary/${summary}`);
  	  console.log(JSON.stringify(extr.title, null, '\t'));
      return message.reply(`${extr.extract}`);
    })

    .catch(err => {
      console.log(err);
      return message.reply('Try to another search (in english) or contact me at: @ilmalte');
    });

});

bot.startPolling();
