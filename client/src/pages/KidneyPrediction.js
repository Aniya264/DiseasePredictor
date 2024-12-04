import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaStethoscope } from 'react-icons/fa';
import '../style.css';

function KidneyPrediction() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/predict_kidney`, {
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

  // Handle form reset
  const handleReset = () => {
    setFormData({});
    setResult(null);
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
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    placeholder="e.g. 48"
                    onChange={handleChange}
                    value={formData.age || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specific Gravity</Form.Label>
                  <Form.Control
                    type="text"
                    name="sg"
                    placeholder="e.g. 1.02"
                    onChange={handleChange}
                    value={formData.sg || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Albumin</Form.Label>
                  <Form.Control
                    type="text"
                    name="al"
                    placeholder="e.g. 1.0"
                    onChange={handleChange}
                    value={formData.al || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pus Cell</Form.Label>
                  <Form.Control
                    type="text"
                    name="pc"
                    placeholder="0 = Normal, 1 = Abnormal"
                    onChange={handleChange}
                    value={formData.pc || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Blood Glucose Random</Form.Label>
                  <Form.Control
                    type="text"
                    name="bgr"
                    placeholder="e.g. 100"
                    onChange={handleChange}
                    value={formData.bgr || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Blood Urea</Form.Label>
                  <Form.Control
                    type="text"
                    name="bu"
                    placeholder="e.g. 50"
                    onChange={handleChange}
                    value={formData.bu || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Serum Creatinine</Form.Label>
                  <Form.Control
                    type="text"
                    name="sc"
                    placeholder="e.g. 1.2"
                    onChange={handleChange}
                    value={formData.sc || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hemoglobin</Form.Label>
                  <Form.Control
                    type="text"
                    name="hemo"
                    placeholder="e.g. 15"
                    onChange={handleChange}
                    value={formData.hemo || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Packed Cell Volume</Form.Label>
                  <Form.Control
                    type="text"
                    name="pcv"
                    placeholder="e.g. 44"
                    onChange={handleChange}
                    value={formData.pcv || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Red Blood Cells</Form.Label>
                  <Form.Control
                    type="text"
                    name="rc"
                    placeholder="e.g. 4.5"
                    onChange={handleChange}
                    value={formData.rc || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hypertension</Form.Label>
                  <Form.Control
                    type="text"
                    name="htn"
                    placeholder="0 = No, 1 = Yes"
                    onChange={handleChange}
                    value={formData.htn || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Diabetes Mellitus</Form.Label>
                  <Form.Control
                    type="text"
                    name="dm"
                    placeholder="0 = No, 1 = Yes"
                    onChange={handleChange}
                    value={formData.dm || ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Appetite</Form.Label>
                  <Form.Control
                    type="text"
                    name="appet"
                    placeholder="0 = Good, 1 = Poor"
                    onChange={handleChange}
                    value={formData.appet || ''}
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
          {result && (
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