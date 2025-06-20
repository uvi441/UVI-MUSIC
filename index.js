const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  throw new Error("EFATAL: Telegram Bot Token not provided");
}

const bot = new TelegramBot(token, { polling: true });

// Optional: /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Uvi Music Bot! 🎵");
});
