import React from 'react';
import { View, Text, FlatList } from 'react-native'; // <-- Import FlatList

export default function WatchlistScreen() {
  // Dummy data
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', key: '1' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', key: '2' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', key: '3' },
    // Add more stocks as needed
  ];

  return (
    <View>
      <Text>Watchlist</Text>
      <FlatList
        data={stocks}
        renderItem={({ item }) => (
          <View>
            <Text>{item.symbol}: {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}