import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigation';
import StockDetailsScreen from '../screens/StockDetailsScreen';

const MainStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="StockDetails" component={StockDetailsScreen} options={{ headerShown: false}} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
