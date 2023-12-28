// ImageGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/ImageGenerator.css';

const ImageGenerator = () => {
    const defaultPrompt = 'Bears making a tea party in the forest';
    const [prompt, setPrompt] = useState('');
    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [imageData, setImageData] = useState('');
    
    const getImage = async () => {
      axios.get('http://localhost:5000/getimages', { responseType: 'arraybuffer' })
      .then(response => {
        const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        setImageData(`data:image/jpeg;base64,${base64}`);
      })
      .catch(error => console.error('Error fetching image data:', error));
    };

    const handleGenerateImage = async () => {
      try {
        setStatus('Image generation started. You will be notified once it is complete.\n With prompt: ' + prompt + '\n With width: ' + width + '\n With height: ' + height);
        setError('');
  
        // Make a POST request to your backend endpoint
        const response = await axios.post('http://localhost:5000/imagegen/generateImage', {
          prompt,
          width,
          height,
        });
  
        setStatus(response.data);
        getImage();
      } catch (err) {
        console.error('Error in image generation:', err.message);
        setError('Error in image generation. Please try again.');
        setStatus('');
      }
    };

  return (
    <div>
      <h1>Image Generator</h1>
      {/* Empty space for the generated image */}
      <div className="generated-image">
        {imageData ? (
          <img src={imageData} alt="Generated Image" />
        ) : (
          <p>No image generated yet</p>
        )}
      </div>
      <label>
        Prompt:
        <textarea className="prompt-input" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={defaultPrompt}/>
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
    </div>
  );
};

export default ImageGenerator;
