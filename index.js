const express = require('express');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// NEW BOT TOKEN
const BOT_TOKEN = '8020802283:AAEGm5YFxmo0irnzRMCsIj5Pix-zQfZM8KU';
const bot = new TelegramBot(BOT_TOKEN);

// Enable CORS for frontend to call this backend
app.use(cors());

// Webhook route to receive Telegram updates
app.post(`/bot${BOT_TOKEN}`, express.json(), (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle /start or any command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 Welcome to Uvi Music Bot!\nSend a song name to search.');
});

// Handle any user message (for demo, just reply with a static response)
bot.on('message', async (msg) => {
  if (!msg.text.startsWith("/")) {
    const chatId = msg.chat.id;
    const query = msg.text;
    await bot.sendMessage(chatId, `🎵 Searching for: ${query} (Demo mode)`);
    // Add your real search + YouTube API integration here later
  }
});

// Demo songs API for Uvi frontend
app.get('/songs', async (req, res) => {
  const songs = [
    {
      title: "Never Gonna Give You Up",
      artist: "Rick Astley",
      image: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      audio: "https://example.com/audio1.mp3"
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      image: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
      audio: "https://example.com/audio2.mp3"
    }
  ];
  res.json(songs);
});

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Set webhook (do this only once)
  const webhookURL = `https://uvi-music-1.onrender.com/bot${BOT_TOKEN}`;
  try {
    await bot.setWebHook(webhookURL);
    console.log(`✅ Webhook set: ${webhookURL}`);
  } catch (error) {
    console.error('❌ Failed to set webhook:', error.message);
  }
});
