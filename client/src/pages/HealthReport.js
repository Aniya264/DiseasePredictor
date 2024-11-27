import React, { useState } from 'react';

function HealthReport() {
  const [data, setData] = useState({});
  const [report, setReport] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/health_report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const reportData = await response.json();
      setReport(reportData.report);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3>Health Report</h3>
      <button onClick={handleSubmit}>Generate Report</button>
      {report && (
        <div>
          <p>Kidney Disease: {report.kidney}</p>
          <p>Heart Disease: {report.heart}</p>
        </div>
      )}
    </div>
  );
}

export default HealthReport;