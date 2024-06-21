import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/feed', async (req, res) => {
  try {
    const response = await fetch('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch public feed' });
  }
});

app.get('/api/search', async (req, res) => {
  const { tags } = req.query;
  try {
    const response = await fetch(`https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${tags}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to search images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
