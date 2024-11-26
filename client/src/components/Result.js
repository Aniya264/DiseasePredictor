import React from 'react';

function Result({ result, diseaseType }) {
  return (
    <div>
      <h3>{diseaseType} Prediction Result</h3>
      <p>{result ? `The predicted result is: ${result}` : "No result yet."}</p>
    </div>
  );
}

export default Result;
