import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';

function Message({children}){
  return (
    <Text style={styles.message} numberOfLines={1} adjustsFontSizeToFit={false}>
      {children}
    </Text>
  )
}

export default function App() {

  return (
    <View style={styles.container}>
      <Login/>
    </View>
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
