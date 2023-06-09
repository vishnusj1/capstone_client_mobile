import React, { useState, useEffect } from "react";
import axios from "axios"; // <-- Import axios for fetching stock list
import GlobalStyles from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native"; // <-- Import FlatList

export default function SearchScreen() {
  const [stocks, setStocks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=af4918b3db2e900571001a068fa41140`
        ); // <-- Replace with your FMP API key
        const data = response.data;
        const companies = data.map((company) => {
          return {
            symbol: company.symbol,
            name: company.name,
            sector: company.sector,
            founded: company.founded,
          };
        });
        setStocks(companies);
      } catch (error) {
        console.error("Failed to fetch stock list", error);
      }
    };
    fetchStocks();
  }, []);

  const filteredStocks = stocks
    .filter((stock) => {
      return (
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.sector.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      const aNameMatches = a.name.toLowerCase().includes(query.toLowerCase());
      const bNameMatches = b.name.toLowerCase().includes(query.toLowerCase());

      if (aNameMatches && !bNameMatches) {
        return -1;
      } else if (!aNameMatches && bNameMatches) {
        return 1;
      } else {
        return 0;
      }
    });

  const addToWatchlist = async (stock) => {
    try {
      const watchlist =
        JSON.parse(await AsyncStorage.getItem("watchlist")) || [];
      if (!watchlist.some((item) => item.symbol === stock.symbol)) {
        watchlist.push(stock);
        await AsyncStorage.setItem("watchlist", JSON.stringify(watchlist));
        Alert.alert(`${stock.symbol} is added to your watchlist`);
        console.log("Stock already in watchlist:", stock);
      } else {
        Alert.alert(`${stock.symbol} is already in your watchlist`);
      }
    } catch (error) {
      console.error("Failed to add stock to watchlist", error);
      Alert.alert("Error encountered, try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.SearchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter stock symbol, name or sector..."
          placeholderTextColor="#feefdd"
          onChangeText={setQuery}
          value={query}
        />
      </View>
      {stocks.length > 0 ? (
        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => addToWatchlist(item)}>
              <View style={styles.item}>
                <Text style={[GlobalStyles.text, styles.symbolText]}>
                  {item.symbol}
                </Text>
                <Text style={[GlobalStyles.text, styles.nameText]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          <Text style={[GlobalStyles.text, styles.message]}>
            Fetching stocks
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011936",
    color: "#feefdd",
    padding: 20,
  },
  SearchContainer:{
    marginTop:20
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
  item: {
    flex: 1,
    flexDirection: "column",
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
  },
});
