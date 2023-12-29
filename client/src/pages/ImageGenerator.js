// ImageGenerator.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ImageGenerator.css';

const ImageGenerator = () => {
    const defaultPrompt = 'Promt: Bears making a tea party in the forest';
    const [prompt, setPrompt] = useState('');
    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [imageData, setImageData] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
      getImage();
    }, []);

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
          // Check if the entered width and height are within the allowed limits
          if (width > 1280 || height > 512) {
              setError('Image dimensions cannot exceed 1280x512 pixels.');
              setStatus('');
              return;
          }
  
          setStatus('Image generation started. You will be notified once it is complete.\n With prompt: ' 
              + prompt + '\n Sizes: ' + width + 'x' + height);
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

  const shareImage = async () => {
    if(imageData){
        navigate('/createpost', { state: { imageData } });

    }else{
        setError('No image to share');
    }
  };

  // ... your existing JSX

return (
  <div>
      <h1>Image Generator</h1>
      <div className="generated-image">
          {imageData ? (
              <img src={imageData} alt="Generated Image" />
          ) : (
              <p>No image generated yet</p>
          )}
      </div>
      <div className="status-container">
          {status && <p>Status: {status}</p>}
      </div>
      <div className="error-container">
          {error && <p>{error}</p>}
      </div>
      <textarea className="prompt-input" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={defaultPrompt} />
      <br />
      <input type="number" onChange={(e) => setWidth(e.target.value)} placeholder={"Width: 512"} />
      <br />
      <input type="number" onChange={(e) => setHeight(e.target.value)} placeholder={"Height: 512"} />
      <br />
        <div className="button-container">
          <button onClick={handleGenerateImage}>Cre8</button>
          <button onClick={shareImage}>Share</button>
        </div>
  </div>
);

};

export default ImageGenerator;
