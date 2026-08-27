import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from google.api_core.client_options import ClientOptions
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app) 

# Grab the key
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("❌ CRITICAL WARNING: Python cannot find GOOGLE_API_KEY!")
else:
    print("✅ SUCCESS: API Key found!")

# THIS IS THE MAGIC FIX: Force the modern API endpoint
client_options = ClientOptions(api_endpoint="generativelanguage.googleapis.com")

genai.configure(
    api_key=api_key, 
    client_options=client_options
)

# Use the explicitly supported flash model
model = genai.GenerativeModel('gemini-flash-latest')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        user_message = data.get('message', '')

        if not user_message:
            return jsonify({"success": False, "error": "No message provided"}), 400

        # Give the AI a persona so it acts like an expert assistant
        system_prompt = """
        You are GoatCare AI, an expert farming assistant and guide in India.
        Keep your answers concise, practical, and highly accurate.
        """
        
        full_prompt = f"{system_prompt}\nUser asked: {user_message}"
        
        # Generate the response
        response = model.generate_content(full_prompt)

        return jsonify({
            "success": True, 
            "reply": response.text
        })

    except Exception as e:
        print("AI Error:", str(e))
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)