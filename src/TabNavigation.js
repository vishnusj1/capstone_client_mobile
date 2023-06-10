import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WatchlistScreen from "./WatchListScreen";
import SearchScreen from "./SearchScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Search"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#011936",
          border:'none',
          paddingBottom:5,
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
