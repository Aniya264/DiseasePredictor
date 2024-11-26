import React, { useState } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handle input change
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    setError(false);

    try {
      const res = await fetch('http://localhost:5001/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (res.ok && data.response) {
        setResponse(data.response);
      } else {
        setError(true);
        setResponse('Sorry, I couldn’t understand your query.');
      }
    } catch (err) {
      setError(true);
      setResponse('Error: Unable to process your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle clearing the form
  const handleClear = () => {
    setQuery('');
    setResponse('');
    setError(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '20px' }}>
      <Card className="shadow" style={{ width: '35rem', borderRadius: '10px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: '24px', color: '#00509E' }}>
            Health Assistant Chatbot
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Ask me a health-related question..."
                value={query}
                onChange={handleQueryChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                className="w-45"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="w-45"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Ask'}
              </Button>
            </div>
          </Form>
          {response && (
            <Alert
              className="mt-4 text-center"
              variant={error ? 'danger' : 'success'}
              style={{ fontWeight: 'bold' }}
            >
              {response}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Chatbot;
