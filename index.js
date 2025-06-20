const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(__dirname)); // serve static files like songs.json

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const songs = [];

bot.on('audio', async (msg) => {
  const file = await bot.getFile(msg.audio.file_id);
  const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

  const song = {
    title: msg.audio.title || msg.audio.file_name || "Unknown",
    artist: msg.audio.performer || "Unknown",
    audio: fileUrl,
    image: "https://i.ibb.co/r6phMDb/music-placeholder.png"
  };

  songs.push(song);
  fs.writeFileSync('songs.json', JSON.stringify(songs, null, 2));
  bot.sendMessage(msg.chat.id, `🎵 Added: ${song.title}`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
