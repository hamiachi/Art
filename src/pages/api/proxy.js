import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'No image URL provided' });
    }

    // Tải ảnh từ URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(response.data);

  } catch (error) {
    console.error('Error in proxy server:', error);
    res.status(500).json({ error: 'Failed to fetch image from URL' });
  }
}
