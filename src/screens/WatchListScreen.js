import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // <-- Import useFocusEffect
import GlobalStyles from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Swipeable } from "react-native-gesture-handler"; // <-- Import Swipeable
import Icon from "react-native-vector-icons/Ionicons"; // <-- Import Icon

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native"; // <-- Import FlatList

export default function WatchlistScreen({ navigation }) {
  const [watchlist, setWatchlist] = useState([]); // <-- New state variable

  useFocusEffect(
    React.useCallback(() => {
      const fetchWatchlist = async () => {
        try {
          const storedWatchlist =
            JSON.parse(await AsyncStorage.getItem("watchlist")) || [];
          setWatchlist(storedWatchlist);
          const hasShownAlert = await AsyncStorage.getItem("hasShownAlert");
          if (!hasShownAlert) {
            Alert.alert(
              "Tip",
              "Swipe a stock to the right to remove it from your watchlist."
            );
            await AsyncStorage.setItem("hasShownAlert", "true");
          }
        } catch (error) {
          console.error("Failed to fetch watchlist", error);
        }
      };

      fetchWatchlist();
    }, [])
  );

  const removeFromWatchlist = async (symbol) => {
    try {
      let storedWatchlist =
        JSON.parse(await AsyncStorage.getItem("watchlist")) || [];
      storedWatchlist = storedWatchlist.filter(
        (stock) => stock.symbol !== symbol
      );
      await AsyncStorage.setItem("watchlist", JSON.stringify(storedWatchlist));
      setWatchlist([...storedWatchlist]); // Update the state variable
    } catch (error) {
      console.error("Failed to remove stock from watchlist", error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutButton}>
        <Icon name="log-out-sharp" size={30} color="#feefdd" onPress={handleLogout}/>
      </View>
      <View style={styles.WatchListScreenContainer}>
        <Text style={[GlobalStyles.text, styles.header]}>Your Watchlist</Text>
        <View style={styles.line} />
        {watchlist.length > 0 ? (
          <FlatList
            data={watchlist}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item }) => (
              <SwipeableRow
                item={item}
                onDelete={removeFromWatchlist}
                navigator={navigation}
              />
            )}
          />
        ) : (
          <View>
            <Text style={[GlobalStyles.text, styles.message]}>
              No items in your watchlist
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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

function SwipeableRow({ item, onDelete, navigator }) {
  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={() => onDelete(item)}>
        <View style={styles.deleteBox}>
          <Icon name="trash-outline" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() =>
          navigator.navigate("StockDetails", { symbol: item.symbol , name:item.name})
        }
      >
        <View style={styles.item}>
          <Text style={[GlobalStyles.text, styles.symbolText]}>
            {item.symbol}
          </Text>
          <Text style={[GlobalStyles.text, styles.nameText]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
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
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  deleteText: {
    color: "#FFF",
  },
  logoutButton: {
    position: "absolute",
    marginTop:20,
    top: 50,
    right: 10,
  },
});
