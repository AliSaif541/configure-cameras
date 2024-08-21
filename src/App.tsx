import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ConfigureCameras from './pages/ConfigureCameras';
import { useEffect, useState } from 'react';
import StitchedView from './pages/StitchedView';

function App() {
  const [stitchedFeed, setStitchedFeed]  = useState(() => {
    const storedFeed = sessionStorage.getItem('stitchedFeed');
    return storedFeed ? JSON.parse(storedFeed) : null;
  });
  
  useEffect(() => {
    sessionStorage.setItem('stitchedFeed', JSON.stringify(stitchedFeed));
    console.log("stitchedFeed: ", stitchedFeed);
  }, [stitchedFeed]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configure-cameras" element={<ConfigureCameras setStitchedFeed={setStitchedFeed} />} />
        <Route path='/stitched-view' element={<StitchedView stitchedFeed={stitchedFeed} />} />
      </Routes>
    </Router>
  )
}

export default App;
