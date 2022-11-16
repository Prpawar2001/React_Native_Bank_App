import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import ForgotPass from './Screens/ForgotPass';
import Deposit from './Screens/Deposit';
import Withdraw from './Screens/Withdraw';
import Transfer from './Screens/Transfer';
import History from './Screens/History';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ForgotPass' component={ForgotPass} />
        <Stack.Screen name='Deposit' component={Deposit} />
        <Stack.Screen name='Withdraw' component={Withdraw} />
        <Stack.Screen name='Transfer' component={Transfer} />
        <Stack.Screen name='History' component={History} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
