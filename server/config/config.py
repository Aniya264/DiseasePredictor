import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="config/secrets.env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")