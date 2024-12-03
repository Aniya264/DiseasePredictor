from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import logging
import requests
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

# Comment out MongoDB initialization
# client = MongoClient("mongodb://localhost:27017/")
# db = client['HealthPredictionDB']

# Load models and encoders
with open("models/pkl/heart_disease_model.pkl", "rb") as f:
    model_heart = pickle.load(f)
with open("models/pkl/top_features1.pkl", "rb") as f:
    top_features_heart = pickle.load(f)
with open("models/pkl/feature_encoders1.pkl", "rb") as f:
    feature_encoders_heart = pickle.load(f)

with open("models/pkl/cancer_disease_model.pkl", "rb") as f:
    model_cancer = pickle.load(f)

with open("models/pkl/kidney_disease_model.pkl", "rb") as f:
    model_kidney = pickle.load(f)
with open("models/pkl/top_features.pkl", "rb") as f:
    top_features_kidney = pickle.load(f)
with open("models/pkl/feature_encoders.pkl", "rb") as f:
    feature_encoders_kidney = pickle.load(f)

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
        result = {'prediction': int(prediction)}

        # Add personalized suggestions
        suggestions = {
            0: "Stay hydrated and maintain a healthy diet. Regular check-ups are recommended.",
            1: "Consult a nephrologist immediately. Follow a low-sodium, kidney-friendly diet."
        }
        result['suggestions'] = suggestions[int(prediction)]

        # Comment out MongoDB saving
        # db['kidney-testing'].insert_one({
        #     "disease": "kidney",
        #     "data": filtered_data,
        #     "result": result
        # })

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

    # Check if we have the correct number of features
    missing_fields = [key for key in top_features_heart if key not in filtered_data]
    if len(filtered_data) != len(top_features_heart):
        logging.error(f"Incorrect number of features provided. Missing fields: {missing_fields}")
        return jsonify({"error": "Incorrect number of features provided.", "missing_fields": missing_fields}), 400

    try:
        input_data = np.array(list(filtered_data.values())).reshape(1, -1)
        logging.debug(f"Formatted input data for prediction: {input_data}")

        # Perform prediction
        prediction = model_heart.predict(input_data)[0]
        result = {'prediction': int(prediction)}

        # Comment out MongoDB saving
        # db['heart-testing'].insert_one({
        #     "disease": "heart",
        #     "data": {k: int(v) if isinstance(v, np.int64) else v for k, v in filtered_data.items()},
        #     "result": result
        # })

        return jsonify(result)
    except Exception as e:
        logging.error(f"Error occurred during heart prediction: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/predict_cancer', methods=['POST'])
def predict_cancer():
    data = request.json
    try:
        # Prepare input data
        input_data = np.array(list(data.values())).reshape(1, -1)
        
        # Perform prediction
        prediction = model_cancer.predict(input_data)[0]
        
        # Convert the prediction result to native Python type for compatibility
        result = {'prediction': int(prediction)}
        
        # Comment out MongoDB saving
        # db.predictions.insert_one({
        #     "disease": "cancer",
        #     "data": {k: int(v) if isinstance(v, np.int64) else v for k, v in data.items()},
        #     "result": result
        # })
        
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
    