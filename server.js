const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => res.send('Uvi Backend Live ✅'));

// Serve songs.json
app.get('/songs', (req, res) => {
  const data = fs.readFileSync('songs.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
