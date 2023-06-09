import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';


function Message({children}){
  return (
    <Text style={styles.message} numberOfLines={1} adjustsFontSizeToFit={false}>
      {children}
    </Text>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message:{
    margin:5,
    width:200,
    borderWidth:1,
    padding:10,
    backgroundColor:'green'
  },
  statusBar:{
    backgroundColor:"#011936",
    color:'white'
  }
});
