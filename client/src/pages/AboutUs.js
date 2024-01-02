import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import axios from 'axios';
import "../css/AboutUs.css";
import { Link } from 'react-router-dom';
import RghtArrow from "../images/right-arrow-black.png";
import pic1 from "../images/image-generating1.png";
import pic2 from "../images/image-generation2.png";
import pic3 from "../images/homepage.png";
import pic4 from "../images/ygtprofilewhennofriend.png";
import pic5 from "../images/yangyingprofile1.png";
import pic6 from "../images/loginpagess.png";

const AboutUs = () => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [currentContent, setCurrentContent] = useState(0); // Şu anki içerik indeksi
    const [contents] = useState([
        'Cre8Share is a social media platform where users could share any image by uploading themselves or generating with our AI!',
        'We are glad that we have you as a visitor!'
        ,
        '6'
        ,
        'Just start with couple words, the rest will show up!',
        '1','2','Wanna see the home page? A detail might be more surprising than others!','3','Lets visit some profiles!','4','5','There is more things to find out! Enjoy Cre8Share!','DEVELOPED BY YIGIT ONLU, BERKAY GUZEL, AKIF SELIM ARSLAN, ONUR ADIGUZEL',
        // Add more contents with images as needed
      ]);
  
    // Açıklamaların döngüsel olarak ilerlemesini sağlayacak fonksiyon
    const handleNextContent = () => {
      setCurrentContent((prevIndex) => (prevIndex + 1) % contents.length); // Dizinin sıfırdan başlayacak şekilde döngüsel olarak gezilmesi
    };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/post', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      });
      if (Array.isArray(response.data)) {
        setListOfPosts(response.data.reverse());
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  return (
    <div className="about-us-page">
      <Header />
      <div className="post-list-containerx2">
        {listOfPosts.map((post, index) => (
          <Link to={`/post/${post.id}`} key={index} className="post-itemx2">
            <img
              src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
              alt={`Post ${index}`}
            />
          </Link>
        ))}
      </div>
      <div className="about-section">
      <div className="about-content">
        <h2>What's Cre8Share?</h2>
        {contents[currentContent] === '1' ? (
          <div>
            <img src={pic1} alt="iki" />
          </div>
        ) : (
          <p>{}</p>
        )}
        {contents[currentContent] === '2' ? (
          <div>
            <img src={pic2} alt="iki" />
          </div>
        ) : (
          <p>{}</p>
        )}
        {contents[currentContent] === '3' ? (
          <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
         <img src={pic3} alt="iki" style={{ width: 'auto', height: '550px' }} />
         </div>
          </div>
        ) : (
          <p>{}</p>
        )}
        {contents[currentContent] === '4' ? (
          <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
         <img src={pic4} alt="iki" style={{ width: 'auto', height: '550px' }} />
         </div>
          </div>
        ) : (
          <p>{}</p>
        )}
        {contents[currentContent] === '5' ? (
          <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
         <img src={pic5} alt="iki" style={{ width: 'auto', height: '550px' }} />
         </div>
          </div>
        ) : (
          <p>{}</p>
        )}
        {contents[currentContent] === '6' ? (
          <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
         <img src={pic6} alt="iki" style={{ width: 'auto', height: '550px' }} />
         </div>
          </div>
        ) : (
          <p>{}</p>
        )}
        {!['1', '2', '3', '4', '5', '6'].includes(contents[currentContent]) ? (
     <div>
    <p>{contents[currentContent]}</p>
  </div>
) : (
  <p>{}</p>
)}
      </div>
      <div className="arrow-icon" id="arrowIcon" onClick={handleNextContent}>
        <img src={RghtArrow} alt="Ok simgesi" />
      </div>
    </div>
  </div>
);
};

export default AboutUs;