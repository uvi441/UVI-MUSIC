const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

const songs = require('./songs.json'); // Make sure songs.json is in the same folder

app.get('/songs', (req, res) => {
  res.json(songs);
});

app.get('/', (req, res) => {
  res.send("✅ Uvi Music Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
