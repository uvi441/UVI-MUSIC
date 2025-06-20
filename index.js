// index.js
const TelegramBot = require('node-telegram-bot-api');

const token = '7643175434:AAEKGsWQ5gjR8Si5PmgubZ-dcBeiCwPjFfY';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '🎵 Welcome to Uvi Music Bot! Type a song name to get started.');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text !== '/start') {
    bot.sendMessage(chatId, `🔍 Searching for: ${text}`);
    // Yahan aap song search logic add kar sakte ho (manual ya API)
  }
});
