# Money Mentor 💸🤖

🏆 1st Place Winner – Prayatna '25 Hackathon

This project is a full-stack, AI-powered financial assistant that secured the top spot at the Prayatna '25 Hackathon.
It features a Gemini-integrated chatbot for intelligent financial assistance, real-time risk analysis, and personalized user profile recommendations — delivering smart, data-driven financial insights.

---

## ✨ Features

- 🧠 Conversational AI Chatbot(Gemini): Engages users in natural language conversations to address both basic and advanced investment queries in simple, jargon-free language
- 💬 Personalized Investment Recommendations:Suggests mutual funds, stocks, and other financial products tailored to the user's profile and risk appetite.​
- 📈 AI-Driven Financial Literacy Module:Offers bite-sized lessons, quizzes, and interactive guidance to educate first-time investors.​
- 📁 Real-Time Market Insights:Provides up-to-date market data to assist users in making informed, data-driven investment decisions.


---

## 🗂️ Project Structure

```
Money_Mentor_Prayatna-2025/
├── src/              # React frontend using npm
├── backend/          # Flask backend (Python-based)
├── .env.example      # Environment variable example
└── README.md         # You're here!
```

---

## 🛠️ Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Python 3.12+](https://www.python.org/) for the backend

---

## 🚀 Getting Started

### 🔹 Clone the Repository

```bash
git clone https://github.com/ajaykrishna00-7/Money-Mentor-Stock-market-prediction-and-learning-system-
cd Money-Mentor-Stock-market-prediction-and-learning-system-
```

---

## 🌐 Frontend Setup (React + npm)

```bash
npm install        # Install dependencies
npm run dev        # Start development server
```

The React app should now be running on:  
👉 [http://localhost:8000](http://localhost:8000)

---

## 🧠 Backend Setup (Flask + Gemini API)

```bash
cd ../backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file based on the example
cp .env.example .env

# Fill in your Gemini API key and other required variables in the .env file

# Start the backend server
python app.py
```

The Flask server will now be running at:  
👉 [http://localhost:5000](http://localhost:5000)

---

## 🔑 Environment Variables

Make sure to add the required keys in a `.env` file inside the `/backend` folder.

Example:

```env
GEMINI_API_KEY=your_google_gemini_api_key
SOME_OTHER_CONFIG=value
```
