import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WatchlistScreen from "../screens/WatchListScreen";
import SearchScreen from "../screens/SearchScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Watchlist"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#011936",
          borderTopWidth: 0,          
          paddingBottom:12,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Watchlist') {
            iconName = focused ? 'trending-up-sharp' : 'trending-up-sharp';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-sharp' : 'search-sharp';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }
      )}
    >
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
