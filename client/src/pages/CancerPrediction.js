import React, { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { FaRibbon } from "react-icons/fa";
import "../style.css";

function CancerPrediction() {
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/predict_cancer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
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
              fontSize: "24px",
              color: "#00509E",
              marginBottom: "15px",
            }}
          >
            <FaRibbon className="me-2" /> Cancer Disease Prediction
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="Age"
                    value={formData.Age || ""}
                    placeholder="e.g. 58"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    name="Gender"
                    value={formData.Gender || ""}
                    placeholder="0 = Female, 1 = Male"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>BMI</Form.Label>
                  <Form.Control
                    type="text"
                    name="BMI"
                    value={formData.BMI || ""}
                    placeholder="e.g. 16.08"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Smoking</Form.Label>
                  <Form.Control
                    type="text"
                    name="Smoking"
                    value={formData.Smoking || ""}
                    placeholder="0 = Non-Smoker, 1 = Smoker"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Genetic Risk</Form.Label>
                  <Form.Control
                    type="text"
                    name="GeneticRisk"
                    value={formData.GeneticRisk || ""}
                    placeholder="0 = Low, 1 = Medium, 2 = High"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Physical Activity</Form.Label>
                  <Form.Control
                    type="text"
                    name="PhysicalActivity"
                    value={formData.PhysicalActivity || ""}
                    placeholder="e.g. 8.3"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Alcohol Intake</Form.Label>
                  <Form.Control
                    type="text"
                    name="AlcoholIntake"
                    value={formData.AlcoholIntake || ""}
                    placeholder="e.g. 2.5"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cancer History</Form.Label>
                  <Form.Control
                    type="text"
                    name="CancerHistory"
                    value={formData.CancerHistory || ""}
                    placeholder="0 = No, 1 = Yes"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Buttons on the same row */}
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={handleReset}
                className="me-2"
                style={{
                  fontWeight: "bold",
                  width: "48%",
                }}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: "#00509E",
                  fontWeight: "bold",
                  width: "48%",
                }}
              >
                Predict
              </Button>
            </div>
          </Form>
          {result && (
            <Alert
              variant={result.prediction === 1 ? "danger" : "success"}
              className="mt-4 text-center"
              style={{
                fontWeight: "bold",
                backgroundColor: result.prediction === 1 ? "#D32F2F" : "#388E3C",
                color: "white",
              }}
            >
              {result.prediction === 1 ? "Cancer Detected" : "No Cancer Detected"}
              <br />
              <p>{result.suggestions}</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CancerPrediction;