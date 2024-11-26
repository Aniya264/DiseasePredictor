import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaHeartbeat } from 'react-icons/fa';
import '../style.css';

function HeartPrediction() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await fetch('http://localhost:5001/predict_heart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
    setSubmitted(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '20px' }}>
      <Card className="shadow" style={{ width: '35rem', borderRadius: '10px' }}>
        <Card.Body>
          <Card.Title
            className="text-center"
            style={{
              fontSize: '24px',
              color: '#00509E',
              marginBottom: '15px',
            }}
          >
            <FaHeartbeat className="me-2" /> Heart Disease Prediction
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="age"
                    value={formData.age || ''}
                    placeholder="Age"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="sex"
                    value={formData.sex || ''}
                    placeholder="Sex (0 = Female, 1 = Male)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="cp"
                    value={formData.cp || ''}
                    placeholder="Chest Pain Type (0-3)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="trestbps"
                    value={formData.trestbps || ''}
                    placeholder="Resting Blood Pressure"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="chol"
                    value={formData.chol || ''}
                    placeholder="Cholesterol"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="fbs"
                    value={formData.fbs || ''}
                    placeholder="Fasting Blood Sugar (1 = True, 0 = False)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="restecg"
                    value={formData.restecg || ''}
                    placeholder="Resting ECG (0-2)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="thalach"
                    value={formData.thalach || ''}
                    placeholder="Maximum Heart Rate Achieved"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="exang"
                    value={formData.exang || ''}
                    placeholder="Exercise Induced Angina (1 = Yes, 0 = No)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="oldpeak"
                    value={formData.oldpeak || ''}
                    placeholder="ST Depression Induced by Exercise"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="slope"
                    value={formData.slope || ''}
                    placeholder="Slope of the Peak Exercise ST Segment (0-2)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="ca"
                    value={formData.ca || ''}
                    placeholder="Number of Major Vessels (0-3)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="thal"
                    value={formData.thal || ''}
                    placeholder="Thalassemia (1 = Normal, 2 = Fixed Defect, 3 = Reversible Defect)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={handleReset}
                className="me-2"
                style={{
                  fontWeight: 'bold',
                  width: '48%',
                }}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: '#00509E',
                  fontWeight: 'bold',
                  width: '48%',
                }}
              >
                Predict
              </Button>
            </div>
          </Form>
          {submitted && result !== null && (
            <Alert
              variant={result === 1 ? 'danger' : 'success'}
              className="mt-4 text-center"
              style={{
                fontWeight: 'bold',
                backgroundColor: result === 1 ? '#D32F2F' : '#388E3C',
                color: 'white',
              }}
            >
              {result === 1 ? 'Heart Disease Detected' : 'No Heart Disease Detected'}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default HeartPrediction;
