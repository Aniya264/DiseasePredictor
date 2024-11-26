import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaStethoscope } from 'react-icons/fa';
import '../style.css';

function KidneyPrediction() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Encode categorical fields before sending to backend
  const encodeData = (data) => {
    return {
      ...data,
      appet: data.appet === 'Poor' ? 1 : 0, // Encode "Poor" as 1, "Good" as 0
      dm: data.dm === 'Yes' ? 1 : 0, // Encode "Yes" as 1, "No" as 0
      pc: data.pc === 'normal' ? 0 : 1, // Adjust encoding based on backend logic
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const encodedData = encodeData(formData); // Encode categorical values
      const response = await fetch('http://localhost:5001/predict_kidney', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(encodedData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({});
    setResult(null);
    setSubmitted(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '20px' }}>
      <Card className="shadow" style={{ width: '35rem', borderRadius: '10px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: '24px', color: '#00509E' }}>
            <FaStethoscope className="me-2" />
            Kidney Disease Prediction
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="sc"
                    placeholder="Serum Creatinine"
                    onChange={handleChange}
                    value={formData.sc || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="hemo"
                    placeholder="Hemoglobin"
                    onChange={handleChange}
                    value={formData.hemo || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="sg"
                    placeholder="Specific Gravity"
                    onChange={handleChange}
                    value={formData.sg || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="appet"
                    placeholder="Appetite (Good/Poor)"
                    onChange={handleChange}
                    value={formData.appet || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    value={formData.age || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="al"
                    placeholder="Albumin"
                    onChange={handleChange}
                    value={formData.al || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="pc"
                    placeholder="Pus Cell"
                    onChange={handleChange}
                    value={formData.pc || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="pcv"
                    placeholder="Packed Cell Volume"
                    onChange={handleChange}
                    value={formData.pcv || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="bgr"
                    placeholder="Blood Glucose Random"
                    onChange={handleChange}
                    value={formData.bgr || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="dm"
                    placeholder="Diabetes Mellitus (Yes/No)"
                    onChange={handleChange}
                    value={formData.dm || ''}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={handleReset} className="me-2" style={{ fontWeight: 'bold', width: '48%' }}>
                Reset
              </Button>
              <Button variant="primary" type="submit" style={{ backgroundColor: '#00509E', fontWeight: 'bold', width: '48%' }}>
                Predict
              </Button>
            </div>
          </Form>
          {submitted && result && (
            <Alert
              variant={result.prediction === 1 ? 'danger' : 'success'}
              className="mt-4 text-center"
              style={{ fontWeight: 'bold', backgroundColor: result.prediction === 1 ? '#D32F2F' : '#388E3C', color: 'white' }}
            >
              {result.prediction === 1 ? 'Kidney Disease Detected' : 'No Kidney Disease Detected'}
              <br />
              <p>{result.suggestions}</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default KidneyPrediction;