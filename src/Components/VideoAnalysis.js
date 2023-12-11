import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./VideoAnalysis.css"

function VideoAnalysis() {
  const { videoLink } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/analyzeVideo', {
          videoLink: decodeURIComponent(videoLink),
          // Other parameters as needed
        });
        setResult(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoLink]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/analyzeVideo', {
        videoLink: decodeURIComponent(videoLink),
        name,
        contactNumber: phone,
        // Other parameters as needed
      });

      setSuccessMessage('Callback requested successfully!');
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <nav className="companies">
    <h1>anchors</h1>
    <button class="button btn-outline-primary cursor"  onClick={() => setShowPopup(true)} >Request a Call Back</button>

   </nav>
    <div>
      {loading && <p>Loading...</p>}
      
      {result && (
        <>
        <div className="titlecard">
           <div className="videotitlecard">
         <img
          src={result.videoDetails.thumbnailUrl}
           alt="Video Thumbnail"
           className="thumbnailimage"
         />
         </div>
          <div className="undertitlecard"> 
          <h3> {result.videoDetails.title}</h3>
          <p>Subscriber Count: {result.videoMetrics.subscriberCount}</p>
          <p>Likes: {result.videoMetrics.likes}</p>
          <p>Comments: {result.videoMetrics.comments}</p>
          <p>Views: {result.videoMetrics.views}</p>
          </div>
          <div className="earningtitlecard">
          <h2>Earnings</h2>
          <p>₹ {result.earnings}</p>
          </div>
        </div>
        </>
      )}
    </div>
    {showPopup && (
        <div className="popup">
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Phone Number:
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {successMessage && <p>{successMessage}</p>}
    </>
  );
}

export default VideoAnalysis;