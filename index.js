const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Simple /start handler
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to Uvi Music Bot!');
});

// When a user sends a YouTube link
bot.on('message', async (msg) => {
  if (msg.text && msg.text.includes('youtube.com')) {
    const url = msg.text;
    // Respond with dummy data or link
    bot.sendMessage(msg.chat.id, `Got your song link: ${url}`);
  }
});

// Optional: keep express alive for Render
app.get("/", (req, res) => {
  res.send("Uvi Bot is running");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
