import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { ALPHA_VANTAGE_API_KEY } from "@env";

export default function StockDetailsScreen({ route, navigation }) {
  const { symbol } = route.params;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        ); // - Url to call the alpha vantage api
        const data = await response.json();
        const timeSeries = data["Monthly Time Series"];
        const prices = Object.values(timeSeries).map((value) =>
          parseFloat(value["4. close"])
        );
        const dates = Object.keys(timeSeries).map((date) => new Date(date));
        setData({ prices, dates });
        navigation.setOptions({ title: symbol });
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <View>
      <Text>Stock Details: {symbol}</Text>
    </View>
  );
}
