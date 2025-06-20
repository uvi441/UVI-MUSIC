const TelegramBot = require('node-telegram-bot-api');

// Get token from environment variable
const token = process.env.BOT_TOKEN;

// Use polling (NOT webhook)
const bot = new TelegramBot(token, { polling: true });

// Start message
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Welcome to Uvi Music Bot!");
});

// Example: reply to any message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text && !msg.text.startsWith('/start')) {
    bot.sendMessage(chatId, `🎵 You said: "${msg.text}"`);
  }
});
