import React, { useState, useEffect } from "react";
import globalStyles from "./globalStyles";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from "react-native"; // <-- Import FlatList
import { ALPHA_VANTAGE_API_KEY } from "@env"; // <-- Import API key

export default function WatchlistScreen({ navigation }) {
  const [stocks, setStocks] = useState([]); // state variable to store User's watchlist
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();

      if (data["Global Quote"]) {
        setStocks((prevStocks) => [...prevStocks, data["Global Quote"]]);
      } else {
        console.error("Failed to fetch stock data for symbol:", symbol);
      }

      setSymbol(""); // <-- Reset the symbol
    } catch (error) {
      console.error("Failed to fetch stock data", error);
    }
  };
  //  make watchlist data persist
  //  use a different screen
  //  use context provider to share state
  return (
    <View style={styles.container}>
      <View style={styles.WatchListScreenContainer}>
        <Text style={[globalStyles.text, styles.header]}>Your Watchlist</Text>
        <View style={styles.line} />
        {stocks.length > 0 ? (
          <FlatList
            data={stocks}
            keyExtractor={(item) => item["01. symbol"]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.text}>
                  {item["01. symbol"]}: {item["05. price"]}
                </Text>
              </View>
            )}
          />
        ) : (
          <View>
            <Text style={[globalStyles.text, styles.message]}>
              No items in your watchlist
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" , justifyContent:"center"}}>
              <Button
                title="Add Stocks"
                onPress={() => navigation.navigate("Search")}
                style={{ flex: 0, paddingHorizontal: 8 }}
              />
            </View>
          </View>
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
  WatchListScreenContainer: {
    flex: 1,
    margin: 20,
  },
  header: {
    marginTop: 50,
    fontSize: 24,
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
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  symbolText: {
    fontSize: 12,
    opacity: 0.6,
  },
  nameText: {
    fontSize: 16,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginBottom: 8,
    marginTop: 8,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
