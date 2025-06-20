const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const app = express();

const TOKEN = process.env.BOT_TOKEN; // Or hardcoded if not using env
const bot = new TelegramBot(TOKEN);

app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.setWebHook(`https://<your-render-url>.onrender.com/bot${TOKEN}`);

// Handle /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎵 Welcome to Uvi Music Bot!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
