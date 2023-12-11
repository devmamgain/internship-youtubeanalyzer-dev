import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"
function LandingPage() {
  const navigate = useNavigate();
  const [videoLink, setVideoLink] = useState('');

  const analyzeVideo = () => {
    navigate(`/result/${encodeURIComponent(videoLink)}`);
  };

  return (
    <>
   <nav className="company">
    <img src="./assests/anchoricon.jpeg" alt="imegicon" className='iconn'/>
    <h1>anchors</h1>
   </nav>
    <div className="landingpage">
      <h1 className='mainhead'>Analyze your Earning
        <br></br>
         Potential</h1>
         <p className="mainpara">Turn your Youtube expertise into a lucrative income
          <br></br>
           through resource sharing</p>
      <div className="underlandingpage">
      <input
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="Enter youtube video link"
        className="videolink"
        class="form-input lh-ls error"
      />
      <button onClick={analyzeVideo}
      className="analysebutton" class="button btn-primary cursor"
      >Analyze Video</button>
      </div>
    </div>
    </>
  );
}

export default LandingPage;
