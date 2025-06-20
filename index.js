const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");

const token = process.env.BOT_TOKEN;
const url = process.env.RENDER_EXTERNAL_URL;

const bot = new TelegramBot(token);
const app = express();
app.use(bodyParser.json());

// Webhook set
bot.setWebHook(`${url}/bot${token}`);

// Telegram hits this route
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Welcome to Uvi Music Bot!");
});

bot.on("message", (msg) => {
  if (!msg.text.startsWith("/start")) {
    bot.sendMessage(msg.chat.id, `🎵 You said: "${msg.text}"`);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Bot is running via webhook");
});
