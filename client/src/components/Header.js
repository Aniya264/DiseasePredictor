import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header
      style={{
        backgroundColor: '#0056b3',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 className="m-0" style={{ padding: '2px 0' }}>Disease Prediction System</h1>
      <nav
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          width: '100%',
        }}
      >
        <div className="container d-flex justify-content-center" style={{ padding: '4px 0' }}>
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
    </header>
  );
}

export default Header;