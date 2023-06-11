import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import MainStackNavigator from './MainStackNavigator';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
