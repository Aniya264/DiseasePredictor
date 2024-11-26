import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import KidneyPrediction from './components/KidneyPrediction';
import HeartPrediction from './components/HeartPrediction';
import CancerPrediction from './components/CancerPrediction';
import Chatbot from './components/Chatbot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add this for additional CSS styles

function WelcomeMessage() {
  return (
    <div
      style={{
        textAlign: 'center',
        color: '#003366', // Changed to dark blue for better visibility
        zIndex: 2,
        marginBottom: '20px',
      }}
    >
      <h2>Welcome to the Disease Prediction System</h2>
      <p>Select a disease from the navigation menu to predict its likelihood based on your input data.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <header
          style={{
            backgroundColor: '#0056b3', // Set back to original blue color
            color: 'white',
            padding: '20px 0',
            textAlign: 'center',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <h1 className="m-0">Disease Prediction System</h1>
        </header>

        {/* Navigation Bar */}
        <nav
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 0',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div className="container d-flex justify-content-center">
            <Link className="text-white mx-3 fw-bold" to="/">
              Home
            </Link>
            <Link className="text-white mx-3 fw-bold" to="/kidney">
              Kidney 
            </Link>
            <Link className="text-white mx-3 fw-bold" to="/heart">
              Heart 
            </Link>
            <Link className="text-white mx-3 fw-bold" to="/cancer">
              Cancer 
            </Link>
            <Link className="text-white mx-3 fw-bold" to="/chatbot">
              Chatbot
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <div className="background-image" />
          <div style={{ position: 'relative', zIndex: 3, padding: '20px' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <div style={{ marginTop: '50px' }}>
                    <WelcomeMessage />
                  </div>
                }
              />
              <Route path="/kidney" element={<KidneyPrediction />} />
              <Route path="/heart" element={<HeartPrediction />} />
              <Route path="/cancer" element={<CancerPrediction />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: '#0056b3', // Set back to original blue color
            color: 'white',
            padding: '10px 0',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          &copy; 2024 Disease Prediction System. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
