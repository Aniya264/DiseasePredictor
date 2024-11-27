import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import KidneyPrediction from './pages/KidneyPrediction';
import HeartPrediction from './pages/HeartPrediction';
import CancerPrediction from './pages/CancerPrediction';
import Chatbot from './pages/Chatbot';
// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App-container">
        <Header />
        <main className="App-main">
          <div className="background-image" />
          <div style={{ position: 'relative', zIndex: 3, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kidney" element={<KidneyPrediction />} />
              <Route path="/heart" element={<HeartPrediction />} />
              <Route path="/cancer" element={<CancerPrediction />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </div>
        </main>
        <Footer className="App-footer" />
      </div>
    </Router>
  );
}

export default App;