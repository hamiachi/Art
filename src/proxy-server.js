const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/get-image', async (req, res) => {
  try {
    const response = await axios.get('https://api.getimg.ai/v1/stable-diffusion/text-to-image', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});