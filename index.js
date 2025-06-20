const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(__dirname));

const songs = fs.existsSync('songs.json')
  ? JSON.parse(fs.readFileSync('songs.json'))
  : [];

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `🎧 Welcome to Uvi Music Bot!\n\nSend me a YouTube link to add a song.`);
});

bot.on('message', async (msg) => {
  const text = msg.text;
  if (!text?.startsWith('http')) return;

  const chatId = msg.chat.id;

  try {
    const info = await ytdl.getInfo(text);
    const title = info.videoDetails.title;
    const channel = info.videoDetails.author.name;
    const thumbnail = info.videoDetails.thumbnails.pop().url;
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const audioUrl = audioFormats[0].url;

    const song = {
      title,
      artist: channel,
      audio: audioUrl,
      image: thumbnail
    };

    songs.push(song);
    fs.writeFileSync('songs.json', JSON.stringify(songs, null, 2));

    bot.sendMessage(chatId, `✅ Song added: ${title}`);
  } catch (err) {
    bot.sendMessage(chatId, `❌ Failed to fetch audio. Invalid YouTube link?`);
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
