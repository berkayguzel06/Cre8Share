const express = require('express');
const router = express.Router();
const {performSetup, generateImageInBackground} = require('../middlewares/GenerateImage')

let isSetupCompleted = false; // Flag to check if setup is completed

router.post('/generateImage', async (req, res) => {
  try {
    const { prompt, width, height } = req.body;

    // Perform setup only first run
    if (!isSetupCompleted) {
      await performSetup(); // Make setup to user local if it is not completed
      isSetupCompleted = true;
    }

    // Generate image in the background
    const imagePath = await generateImageInBackground(prompt, width, height);

    // Respond to the client with the generated image path
    res.status(200).send("Image generated successfully.");
  } catch (error) {
    console.error(`Error in image generation: ${error.message}`);
    res.status(500).send({ error: 'Image generation failed' });
  }
});

module.exports = router;