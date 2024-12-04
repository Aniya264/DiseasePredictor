from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import logging
import os
from dotenv import load_dotenv
import google.generativeai as genai


# Load environment variables and configure Gemini
load_dotenv(dotenv_path=".env")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize logging and app setup
logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load models and encoders
# Kidney
with open("models/pkl/trained_model_kidney.pkl", "rb") as f:
    model_kidney = pickle.load(f)
with open("models/pkl/top_features_kidney.pkl", "rb") as f:
    top_features_kidney = pickle.load(f)
with open("models/pkl/feature_encoders_kidney.pkl", "rb") as f:
    feature_encoders_kidney = pickle.load(f)
# Heart
with open("models/pkl/trained_model_heart.pkl", "rb") as f:
    model_heart = pickle.load(f)
with open("models/pkl/top_features_heart.pkl", "rb") as f:
    top_features_heart = pickle.load(f)
with open("models/pkl/feature_encoders_heart.pkl", "rb") as f:
    feature_encoders_heart = pickle.load(f)
# Cancer
with open("models/pkl/trained_model_cancer.pkl", "rb") as f:
    model_cancer = pickle.load(f)
with open("models/pkl/top_features_cancer.pkl", "rb") as f:
    top_features_cancer = pickle.load(f)
with open("models/pkl/feature_encoders_cancer.pkl", "rb") as f:
    feature_encoders_cancer = pickle.load(f)

# Routes
@app.route('/')
def home():
    return "Health Prediction API"

@app.route('/predict_kidney', methods=['POST'])
def predict_kidney():
    data = request.json
    logging.debug(f"Received data for kidney prediction: {data}")

    # Filter input data to include only top features
    filtered_data = {key: data[key] for key in top_features_kidney if key in data}

    # Validate that all top features are provided
    missing_fields = [key for key in top_features_kidney if key not in filtered_data]
    if missing_fields:
        logging.error(f"Missing fields: {missing_fields}")
        return jsonify({"error": "Missing required fields", "missing_fields": missing_fields}), 400

    try:
        input_data = np.array(list(filtered_data.values())).reshape(1, -1)
        logging.debug(f"Formatted input data for prediction: {input_data}")

        # Perform prediction
        prediction = model_kidney.predict(input_data)[0]
        print("Kidney Prediction", prediction)
        result = {'prediction': int(prediction)}

        # Add personalized suggestions
        suggestions = {
            0: "Stay hydrated and maintain a healthy diet. Regular check-ups are recommended.",
            1: "Consult a nephrologist immediately. Follow a low-sodium, kidney-friendly diet."
        }
        result['suggestions'] = suggestions[int(prediction)]

        return jsonify(result)
    except Exception as e:
        logging.error(f"Error occurred during kidney prediction: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    data = request.json
    logging.debug(f"Received data for heart prediction: {data}")

    # Filter input data to include only top features
    filtered_data = {key: data[key] for key in top_features_heart if key in data}

    # Validate that all top features are provided
    missing_fields = [key for key in top_features_heart if key not in filtered_data]
    if missing_fields:
        logging.error(f"Missing fields: {missing_fields}")
        return jsonify({"error": "Missing required fields", "missing_fields": missing_fields}), 400

    try:
        # Convert string values to float for prediction
        numeric_data = {k: float(v) for k, v in filtered_data.items()}
        input_data = np.array(list(numeric_data.values())).reshape(1, -1)
        logging.debug(f"Formatted input data for prediction: {input_data}")

        # Perform prediction
        prediction = model_heart.predict(input_data)[0]
        print("Heart Prediction", prediction)
        result = {'prediction': int(prediction)}

        # Add personalized suggestions
        suggestions = {
            0: "Maintain a healthy diet and exercise regularly. Regular check-ups are recommended.",
            1: "Consult a cardiologist immediately. Follow a heart-healthy diet and medication plan."
        }
        result['suggestions'] = suggestions[int(prediction)]
        
        return jsonify(result)
    except Exception as e:
        logging.error(f"Error occurred during heart prediction: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/predict_cancer', methods=['POST'])
def predict_cancer():
    data = request.json
    logging.debug(f"Received data for cancer prediction: {data}")

    # Filter input data to include only top features
    filtered_data = {key: data[key] for key in top_features_cancer if key in data}

    # Validate that all top features are provided
    missing_fields = [key for key in top_features_cancer if key not in filtered_data]
    if missing_fields:
        logging.error(f"Missing fields: {missing_fields}")
        return jsonify({"error": "Missing required fields", "missing_fields": missing_fields}), 400

    try:
        # Convert string values to float for prediction
        numeric_data = {k: float(v) for k, v in filtered_data.items()}
        input_data = np.array(list(numeric_data.values())).reshape(1, -1)
        logging.debug(f"Formatted input data for prediction: {input_data}")

        # Perform prediction
        prediction = model_cancer.predict(input_data)[0]
        print("Cancer Prediction", prediction)
        result = {'prediction': int(prediction)}

        # Add personalized suggestions
        suggestions = {
            0: "Maintain a healthy lifestyle and regular screenings. Stay informed about cancer prevention.",
            1: "Consult an oncologist immediately. Follow the recommended treatment plan and support groups."
        }
        result['suggestions'] = suggestions[int(prediction)]
        
        return jsonify(result)
    except Exception as e:
        logging.error(f"Error occurred during cancer prediction: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        # Get user query from the request
        user_query = request.json.get('query', '')
        if not user_query:
            return jsonify({'error': 'Query is required'}), 400

        # Generate response using Gemini
        response = model.generate_content(user_query)
        
        # Handle API response
        if response:
            return jsonify({'response': response.text})
        else:
            return jsonify({'error': 'No response from Gemini API'}), 500

    except Exception as e:
        logging.error(f"Error occurred during chatbot request: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
    