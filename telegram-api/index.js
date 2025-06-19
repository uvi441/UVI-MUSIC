const express = require('express');
const axios = require('axios');
const app = express();

const BOT_TOKEN = '7643175434:AAEKGsWQ5gjR8Si5PmgubZ-dcBeiCwPjFfY';
const CHAT_ID = '@Puppyy441';

app.get('/songs', async (req, res) => {
  const query = req.query.q || 'No query';
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `🔍 User searched for: ${query}`
    });
    res.send({ success: true, message: 'Message sent to Telegram!' });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
