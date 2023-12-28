// ImageGenerator.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [imagePath, setImagePath] = useState('');
  
    const handleGenerateImage = async () => {
      try {
        setStatus('Image generation started. You will be notified once it is complete.');
        setError('');
  
        // Make a POST request to your backend endpoint
        const response = await axios.post('http://localhost:5000/imagegen/generateImage', {
          prompt,
          width,
          height,
        });
  
        setStatus(response.data);
        setImagePath(response.data.imagePath); // Set the image path in the state
      } catch (err) {
        console.error('Error in image generation:', err.message);
        setError('Error in image generation. Please try again.');
        setStatus('');
      }
    };

  return (
    <div>
      <h1>Image Generator</h1>
      <label>
        Prompt:
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      <br />
      <label>
        Width:
        <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
      </label>
      <br />
      <label>
        Height:
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </label>
      <br />
      <button onClick={handleGenerateImage}>Generate Image</button>
      {status && <p>Status: {status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imagePath && <img src={imagePath} alt="Generated Image" />}
    </div>
  );
};

export default ImageGenerator;
