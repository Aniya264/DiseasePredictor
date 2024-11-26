import React, { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { FaRibbon } from "react-icons/fa"; // Use an appropriate cancer-related icon
import "../style.css";

function CancerPrediction() {
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
      const response = await fetch("http://localhost:5001/predict_cancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Error:", error);
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
                  <Form.Control
                    type="text"
                    name="age"
                    value={formData.age || ""}
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
                    name="gender"
                    value={formData.gender || ""}
                    placeholder="Gender"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="bmi"
                    value={formData.bmi || ""}
                    placeholder="BMI"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="smoking"
                    value={formData.smoking || ""}
                    placeholder="Smoking (Yes/No)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="genetic_risk"
                    value={formData.genetic_risk || ""}
                    placeholder="Genetic Risk (Low/Medium/High)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="physical_activity"
                    value={formData.physical_activity || ""}
                    placeholder="Physical Activity (Low/Moderate/High)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="alcohol_intake"
                    value={formData.alcohol_intake || ""}
                    placeholder="Alcohol Intake (None/Moderate/High)"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="cancer_history"
                    value={formData.cancer_history || ""}
                    placeholder="Cancer History (Yes/No)"
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
          {submitted && result !== null && (
            <Alert
              variant={result === 1 ? "danger" : "success"}
              className="mt-4 text-center"
              style={{
                fontWeight: "bold",
                backgroundColor: result === 1 ? "#D32F2F" : "#388E3C",
                color: "white",
              }}
            >
              {result === 1 ? "Cancer Detected" : "No Cancer Detected"}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CancerPrediction;
