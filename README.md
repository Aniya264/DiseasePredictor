# Disease Prediction System

## Team Members (Group 5)
- Aniya
- Athithan Somascanthan
- Sahithya Vallabhaneni
- Sarbjit Kaur
- Wenjie Zhou

## Description
The Disease Prediction System is a web application that leverages machine learning models to predict the likelihood of various diseases, including heart disease, kidney disease, and cancer. The application also features a health assistant chatbot for answering health-related queries.

## Deployment
- **Backend**: Deployed on Render [https://diseasepredictor-cbiz.onrender.com/](https://diseasepredictor-cbiz.onrender.com/)
- **Frontend**: Deployed on Netlify [https://diseasepredictionsystem.netlify.app/](https://diseasepredictionsystem.netlify.app/)

## Features
- **Heart Disease Prediction**: Predicts the likelihood of heart disease based on user input.
- **Kidney Disease Prediction**: Predicts the likelihood of kidney disease based on user input.
- **Cancer Prediction**: Predicts the likelihood of cancer based on user input.
- **Health Assistant Chatbot**: Provides answers to health-related queries.

## Tech Stack
### Frontend
- React.js
- Bootstrap
- React Router
- Axios

### Backend
- Python Flask
- scikit-learn
- MongoDB
- Gunicorn

## Installation & Setup

### Backend Setup
1. Navigate to the `server` directory:
    ```bash
    cd server
    ```
2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    venv\Scripts\activate  # On Windows
    # source venv/bin/activate  # On macOS/Linux
    ```
3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

### Frontend Setup
1. Navigate to the `client` directory:
    ```bash
    cd client
    ```
2. Install the required packages:
    ```bash
    npm install
    ```

## Environment Variables
### Backend (.env)
GEMINI_API_KEY

### Frontend (.env)
REACT_APP_API_BASE_URL

## Running the Application

### Backend
1. Navigate to the `server` directory and activate the virtual environment:
    ```bash
    cd server
    venv\Scripts\activate  # On Windows
    # source venv/bin/activate  # On macOS/Linux
    ```
2. Run the Flask application:
    ```bash
    python app.py
    ```

### Frontend
1. Navigate to the `client` directory:
    ```bash
    cd client
    ```
2. Start the React application:
    ```bash
    npm start
    ```

## API Endpoints
- **POST** `/predict_heart` - Predicts heart disease likelihood.
- **POST** `/predict_kidney` - Predicts kidney disease likelihood.
- **POST** `/predict_cancer` - Predicts cancer likelihood.
- **POST** `/chatbot` - Provides health-related answers.