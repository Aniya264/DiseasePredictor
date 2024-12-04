import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaHeartbeat } from 'react-icons/fa';
import '../style.css';

function HeartPrediction() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/predict_heart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
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
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={formData.age || ''}
                    placeholder="e.g. 52"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Sex</Form.Label>
                  <Form.Control
                    type="text"
                    name="sex"
                    value={formData.sex || ''}
                    placeholder="0 = Female, 1 = Male"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Chest Pain Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="cp"
                    value={formData.cp || ''}
                    placeholder="0 = Typical Angina, 1 = Atypical Angina, 2 = Non-Anginal Pain, 3 = Asymptomatic"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Resting Blood Pressure</Form.Label>
                  <Form.Control
                    type="text"
                    name="trestbps"
                    value={formData.trestbps || ''}
                    placeholder="e.g. 125"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Cholesterol</Form.Label>
                  <Form.Control
                    type="text"
                    name="chol"
                    value={formData.chol || ''}
                    placeholder="e.g. 212"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Fasting Blood Sugar</Form.Label>
                  <Form.Control
                    type="text"
                    name="fbs"
                    value={formData.fbs || ''}
                    placeholder="1 = True, 0 = False"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Resting ECG</Form.Label>
                  <Form.Control
                    type="text"
                    name="restecg"
                    value={formData.restecg || ''}
                    placeholder="0 = Normal, 1 = ST-T Wave Abnormality, 2 = Left Ventricular Hypertrophy"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Maximum Heart Rate Achieved</Form.Label>
                  <Form.Control
                    type="text"
                    name="thalach"
                    value={formData.thalach || ''}
                    placeholder="e.g. 168"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Exercise Induced Angina</Form.Label>
                  <Form.Control
                    type="text"
                    name="exang"
                    value={formData.exang || ''}
                    placeholder="1 = Yes, 0 = No"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>ST Depression Induced by Exercise</Form.Label>
                  <Form.Control
                    type="text"
                    name="oldpeak"
                    value={formData.oldpeak || ''}
                    placeholder="e.g. 1.0"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Slope of the Peak Exercise ST Segment</Form.Label>
                  <Form.Control
                    type="text"
                    name="slope"
                    value={formData.slope || ''}
                    placeholder="0 = Upsloping, 1 = Flat, 2 = Downsloping"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Major Vessels</Form.Label>
                  <Form.Control
                    type="text"
                    name="ca"
                    value={formData.ca || ''}
                    placeholder="0 to 3"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Thalassemia</Form.Label>
                  <Form.Control
                    type="text"
                    name="thal"
                    value={formData.thal || ''}
                    placeholder="1 = Normal, 2 = Fixed Defect, 3 = Reversible Defect"
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
          {result && (
            <Alert
              variant={result.prediction === 1 ? 'danger' : 'success'}
              className="mt-4 text-center"
              style={{
                fontWeight: 'bold',
                backgroundColor: result.prediction === 1 ? '#D32F2F' : '#388E3C',
                color: 'white',
              }}
            >
              {result.prediction === 1 ? 'Heart Disease Detected' : 'No Heart Disease Detected'}
              <br />
              <p>{result.suggestions}</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default HeartPrediction;