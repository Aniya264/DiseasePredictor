import React from 'react';

function HomePage() {
  return (
    <div
      style={{
        textAlign: 'center',
        color: '#003366',
        zIndex: 2,
        marginBottom: '20px',
      }}
    >
      <h2>Welcome to the Disease Prediction System</h2>
      <p>Select a disease from the navigation menu to predict its likelihood based on your input data.</p>
    </div>
  );
}

export default HomePage;