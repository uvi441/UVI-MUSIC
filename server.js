import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.get('/songs', (req, res) => {
  const songsPath = path.join(__dirname, 'songs.json');
  const songs = JSON.parse(fs.readFileSync(songsPath, 'utf8'));
  res.json(songs);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
