const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Telegram bot details
const BOT_TOKEN = '7643175434:AAEKGsWQ5gjR8Si5PmgubZ-dcBeiCwPjFfY';
const CHAT_ID = '@Puppyy441';

// Serve static frontend files (index.html, style.css, script.js)
app.use(express.static(__dirname));

// Songs list
const songs = [
  {
    title: "Kesariya",
    artist: "Arijit Singh",
    cover: "https://i.ytimg.com/vi/BddP6PYo2gs/maxresdefault.jpg",
    audio: "https://example.com/song1.mp3"
  },
  {
    title: "Tera Yaar Hoon Main",
    artist: "Arijit Singh",
    cover: "https://i.ytimg.com/vi/JZvDsxixG9g/maxresdefault.jpg",
    audio: "https://example.com/song2.mp3"
  }
];

// /songs route: sends to Telegram + returns songs
app.get('/songs', async (req, res) => {
  const query = req.query.q || 'No query';

  try {
    // Send message to Telegram bot
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `🔍 User searched for: ${query}`
    });

    // Send back song list
    res.json(songs);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
