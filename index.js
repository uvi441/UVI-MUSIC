const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const token = process.env.BOT_TOKEN; // ✅ Safe & clean
const bot = new TelegramBot(token, { polling: true });

const app = express();
const PORT = process.env.PORT || 3000;

let songs = [];

try {
  songs = JSON.parse(fs.readFileSync("songs.json"));
} catch (e) {
  songs = [];
}

app.use(cors());

app.get("/songs", (req, res) => {
  res.json(songs);
});

bot.on("message", async (msg) => {
  if (msg.audio) {
    const fileId = msg.audio.file_id;
    const title = msg.audio.title || msg.audio.file_name || "Unknown Title";

    const song = {
      title: title,
      fileId: fileId,
    };

    songs.unshift(song);
    fs.writeFileSync("songs.json", JSON.stringify(songs, null, 2));
    bot.sendMessage(msg.chat.id, `✅ "${title}" saved to Uvi songs.`);
  } else if (msg.text === "/start") {
    bot.sendMessage(msg.chat.id, "🎵 Welcome to Uvi Music Bot!");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
