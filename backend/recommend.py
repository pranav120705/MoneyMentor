import csv
import requests
import os
from dotenv import load_dotenv 
load_dotenv()

API_KEY = os.getenv('twell_api')
# Twelve Data API Key
BASE_URL = "https://api.twelvedata.com/price"

# Load stock recommendations from CSV
def load_stock_recommendations(file_path):
    stock_data = {}
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        headers = next(reader)
        for row in reader:
            risk_sector = row[0]
            stock_data[risk_sector] = {headers[i]: row[i].split(',') for i in range(1, len(headers))}
    return stock_data

# Get real-time stock price from Twelve Data
def get_real_time_price(symbol):
    try:
        response = requests.get(f"{BASE_URL}?symbol={symbol}&apikey={API_KEY}")
        data = response.json()
        return float(data['price']) if 'price' in data else None
    except Exception as e:
        print(f"Error fetching price for {symbol}: {e}")
        return None

# Get recommended stocks and fetch their prices
def get_stocks_by_risk_and_sector(stock_data, risk, sectors):
    if isinstance(sectors, str):
        sectors = [sectors]

    recommended_stocks = []
    seen = set()

    for sector in sectors:
        stocks = stock_data.get(risk, {}).get(sector, [])
        for symbol in stocks:
            symbol = symbol.strip().upper()
            if symbol not in seen:
                seen.add(symbol)
                price = get_real_time_price(symbol)
                recommended_stocks.append({
                    "symbol": symbol,
                    "price": price
                })

    return recommended_stocks