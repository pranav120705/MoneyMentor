from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
import os
from conversational_utils import *
from conversational_utils import (
    build_final_prompt,
    load_conversation_history,
    save_conversation_history
)
from lstm_prediction import *
from recommend import *
from dotenv import load_dotenv 
load_dotenv()

STOCK_DATA = load_stock_recommendations(r'C:\Users\prasa\Desktop\Linux\Money_Mentor_Prayatna-2025\backend\expanded_stock_recommendations.csv')
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ====== Configuration ======

API_KEY = os.getenv('gemini_api')

# ====== Mock Data ======
MOCK_LITERACY_DATA = {
    "lessons": [
        {
            "id": 1,
            "title": "Investing Basics",
            "description": "Learn the fundamentals of investing and how to get started.",
            "content": "Investing is the process of allocating resources, usually money, with the expectation of generating income or profit over time.",
            "quiz": [
                {
                    "question": "What is the primary goal of investing?",
                    "options": ["Spending money", "Generating income or profit", "Avoiding taxes", "None of the above"],
                    "correct": 1
                }
            ]
        },
        {
            "id": 2,
            "title": "Risk vs Return",
            "description": "Understanding the relationship between risk and potential returns.",
            "content": "In investing, risk and return are closely related. Generally, investments with higher potential returns come with higher risk.",
            "quiz": [
                {
                    "question": "Which typically has higher risk?",
                    "options": ["Government bonds", "Savings account", "Individual stocks", "Certificate of deposit"],
                    "correct": 2
                }
            ]
        }
    ]
}

MOCK_MARKET_DATA = {
    "indices": [
        {"name": "S&P 500", "value": 4892.37, "change": 1.23},
        {"name": "NASDAQ", "value": 16573.14, "change": 1.65},
        {"name": "Dow Jones", "value": 39069.59, "change": 0.93}
    ],
    "top_gainers": [
        {"symbol": "AAPL", "name": "Apple Inc.", "price": 189.56, "change": 3.45},
        {"symbol": "MSFT", "name": "Microsoft Corp.", "price": 405.23, "change": 2.87},
        {"symbol": "AMZN", "name": "Amazon.com Inc.", "price": 175.35, "change": 2.65}
    ],
    "top_losers": [
        {"symbol": "NFLX", "name": "Netflix Inc.", "price": 567.89, "change": -1.23},
        {"symbol": "TSLA", "name": "Tesla Inc.", "price": 189.45, "change": -2.34},
        {"symbol": "META", "name": "Meta Platforms Inc.", "price": 468.23, "change": -0.98}
    ]
}

# ====== Routes ======

@app.route('/')
def home():
    return "🚀 MoneyMentor API is running!"

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    query = data.get('query', '')
    use_gemini = data.get('use_gemini', True)

    if not query:
        return jsonify({"response": "No query provided."}), 400

    if use_gemini:
        try:
            final_prompt = build_final_prompt(query)
            response_text = get_gemini_response(final_prompt)
            return jsonify({"response": response_text})
        except Exception as e:
            print(f"Error calling Gemini API: {str(e)}")
            return jsonify({"response": f"I encountered an error: {str(e)}"})
    else:
        response = f"You asked: {query}. This is a mock response from the Flask backend."
        return jsonify({"response": response})


@app.route('/api/speech-to-text', methods=['POST'])
def speech_to_text():
    return jsonify({"text": "This is a mock transcription. In a real app, this would be the text from your speech."})

@app.route('/api/literacy', methods=['GET'])
def literacy():
    return jsonify(MOCK_LITERACY_DATA)

@app.route('/recommend', methods=['POST'])
def recommendations():
    data = request.json

    raw_risk_level = data.get('riskLevel')  # 'low', 'medium', or 'high'
    sectors = data.get('sectors', [])

    risk_level = raw_risk_level.strip().capitalize() + ' Risk'

    formatted_stocks = [
        {
            "name": stock,
            "symbol": stock[:3].upper(),
            "sector": sector,
            "price": 100.0 + i * 20,  # mock price
            "recommendation": "Buy",
            "riskLevel": raw_risk_level.capitalize(),
            "potentialReturn": "10-15%",
            "rationale": f"{stock} is recommended under {sector} sector for {risk_level}"
        }
        for sector in sectors
        for i, stock in enumerate(get_stocks_by_risk_and_sector(STOCK_DATA, risk_level, sector))
    ]

    return jsonify(formatted_stocks)

@app.route('/api/insights', methods=['GET'])
def insights():
    return jsonify(MOCK_MARKET_DATA)

@app.route('/api/profile', methods=['POST'])
def save_profile():
    data = request.json
    filepath = os.path.join(os.getcwd(), "userprofile.txt")

    try:
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=4)
        return jsonify({"message": "Profile saved successfully", "data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    ticker = data.get('ticker')

    try:
        future_df, _ = predict_stock_price(ticker)  # discard plot path
        predictions = future_df.to_dict(orient='records')
        return jsonify({ "predictions": predictions })
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

# ====== Start Server ======
if __name__ == '__main__':
    app.run(debug=True, port=5000)