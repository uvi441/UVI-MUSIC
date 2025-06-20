// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ✅ Replace with your new token
const token = '8010449761:AAGVTLG3OwPL6LNwDum2b7DV2yk2Nm3vAs4';

// ✅ Create bot with polling ON
const bot = new TelegramBot(token, { polling: true });

// ✅ Sample response
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '🎵 Welcome to Uvi Music Bot! Send me a song name to get started.');
});

// ✅ Song search (replace this with real logic later)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase();

  if (text && text !== '/start') {
    bot.sendMessage(chatId, `🔍 Searching for: "${text}"...`);
    // Add your logic here to return song file or URL
  }
});

// ✅ Keep app alive
app.get('/', (req, res) => {
  res.send('Uvi Bot is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
