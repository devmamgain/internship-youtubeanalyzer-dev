import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoAnalysis from './Components/VideoAnalysis';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/result/:videoLink" element={<VideoAnalysis />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
