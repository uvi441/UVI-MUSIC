const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const BOT_TOKEN = '7643175434:AAEKGsWQ5gjR8Si5PmgubZ-dcBeiCwPjFfY';
const CHAT_ID = '@Puppyy441';

app.use(cors()); // Allow your frontend to fetch from this backend

app.get('/songs', async (req, res) => {
  const query = req.query.q || 'No query';

  // ✅ Correct way to send Telegram message
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `🔍 User searched for: ${query}`
    });
  } catch (e) {
    console.log("Telegram logging failed:", e.message);
  }

  // ✅ Temporary songs list
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
