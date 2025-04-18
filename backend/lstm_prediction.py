import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
import os

def predict_stock_price(ticker, num_prediction_days=30):
    """Predicts stock prices for a given ticker symbol.

    Args:
        ticker (str): The stock ticker symbol (e.g., 'AAPL').
        num_prediction_days (int): Number of days to predict into the future.

    Returns:
        tuple: A tuple containing the predicted prices DataFrame and the path to the saved plot image.
    """
    # Data Acquisition and Preprocessing
    end = datetime.now()
    start = end - timedelta(days=365 * 2)
    data = yf.download(ticker, start=start, end=end)
    data = data[['Close']]
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)

    sequence_length = 60
    X = []
    y = []
    for i in range(sequence_length, len(scaled_data)):
        X.append(scaled_data[i - sequence_length:i])
        y.append(scaled_data[i])

    X = np.array(X)
    y = np.array(y)
    X = X.reshape(X.shape[0], X.shape[1], 1)

    # Data Splitting
    split = int(0.8 * len(X))
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]

    # Model Loading or Training
    model_path = f"{ticker}_model.h5"
    if os.path.exists(model_path):
        model = load_model(model_path)
    else:
        model = Sequential()
        model.add(LSTM(64, return_sequences=True, input_shape=(X_train.shape[1], 1)))
        model.add(Dropout(0.2))
        model.add(LSTM(32))
        model.add(Dropout(0.2))
        model.add(Dense(1))
        model.compile(optimizer="adam", loss="mean_squared_error")
        model.fit(X_train, y_train, epochs=100, batch_size=2, validation_split=0.1)
        model.save(model_path)

    # Prediction
    predicted = model.predict(X_test)
    predicted_prices = scaler.inverse_transform(predicted)
    actual_prices = scaler.inverse_transform(y_test.reshape(-1, 1))

    # Future Prediction
    future_input = scaled_data[-60:].reshape(1, 60, 1)
    future_predictions = []
    for _ in range(num_prediction_days):
        pred = model.predict(future_input)[0][0]
        future_predictions.append(pred)
        future_input = np.append(future_input[:, 1:, :], [[[pred]]], axis=1)

    future_prices = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))

    # Create DataFrame and save as CSV
    last_date = data.index[-1]
    future_dates = [last_date + timedelta(days=i + 1) for i in range(num_prediction_days)]
    future_df = pd.DataFrame({'Date': future_dates, 'Predicted Price (USD)': future_prices.flatten()})
    csv_file_path = f"{ticker}_predictions.csv"
    future_df.to_csv(csv_file_path, index=False)

    # Create and save the plot
    plt.figure(figsize=(14, 6))
    plt.plot(future_dates, future_prices, label='Predicted ' + ticker + ' Price')
    plt.title(ticker + ' Stock Price Prediction (Next ' + str(num_prediction_days) + ' Days)')
    plt.xlabel('Date')
    plt.ylabel('Price (USD)')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plot_file_path = f"{ticker}_prediction_plot.png"
    plt.savefig(plot_file_path)
    plt.close()  # Close the plot to release resources

    return future_df