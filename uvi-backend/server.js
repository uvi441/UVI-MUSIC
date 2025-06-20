import express from 'express';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/songs.json', (req, res) => {
  const data = fs.readFileSync('songs.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/update', async (req, res) => {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;

  try {
    const query = 'Trending Songs India';
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}&maxResults=10&type=video`
    );

    const songs = response.data.items.map((item) => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      videoId: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    fs.writeFileSync('songs.json', JSON.stringify(songs, null, 2));
    res.send('✅ songs.json updated!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('❌ Error from YouTube API');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Running at http://localhost:${PORT}`);
});
