import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import GlobalStyles from "./GlobalStyles";
import axios from "axios";
import { ALPHA_VANTAGE_API_KEY } from "@env";
import ChartComponent from "./ChartComponent"; // <-- Import ChartComponent

export default function StockDetailsScreen({ route, navigation }) {
  const { symbol } = route.params;
  const [stockInfo, setStockInfo] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Fetch Price data to display chart
    const fetchStockData = async () => {
      try {
        // Fetch stock data
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=8c122dfe461d9f329151cfed093513c1`
        );
        const data = await response.json();
        setStockData(data.historical);
        console.log(stockData);

        // Fetch stock information
        const infoResponse = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        setStockInfo(infoResponse.data);
        // Fetch stock news
        const newsResponse = await axios.get(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        setStockNews(newsResponse.data);
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Stock Details: {symbol}</Text>
        {stockData ? (
          <ChartComponent historicalData={stockData} companyName={symbol} />
        ) : (
          <Text>Loading...</Text>
        )}
        {stockInfo ? (
          <View>
            <Text>Name: {stockInfo.Name}</Text>
            <Text>Industry: {stockInfo.Industry}</Text>
            <Text>Description: {stockInfo.Description}</Text>
          </View>
        ) : (
          <Text>Loading stock information...</Text>
        )}

        {stockNews.length > 0 ? (
          <FlatList
            data={stockNews}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <View>
                <Text>{item.headline}</Text>
                <Text>{item.summary}</Text>
              </View>
            )}
          />
        ) : (
          <Text>Loading stock news...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011936",
    color: "#feefdd",
  },
  StockScreenContainer: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  StockScreenSection: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: "50%",
    marginTop: -100, // replace -100 with half of the form's height to center it vertically
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    color: "#feefdd",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 2,
    backgroundColor: "#508bd4",
    marginTop: 10,
    alignItems: "center",
  },
  textButton: {
    padding: 10,
    borderRadius: 2,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
});
