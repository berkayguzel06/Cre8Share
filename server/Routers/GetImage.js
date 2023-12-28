const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const imageBuffer = await fs.readFile(path.join(__dirname, '..', 'python', 'images', 'generated_image.jpg'));
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error reading image file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
