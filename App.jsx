import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './components/home/Home';
import Login from './components/login/Login';
import Dashboard from './components/home/Dashboard';
import Signup from './components/signup/Signup';
import UserDashboard from './components/home/UserDashboard';
import {LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
LogBox.ignoreLogs(['Reanimated 2']);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Signup" component={Signup}
          options={{
            title: 'SignUp Form',
            headerStyle: {
              backgroundColor: 'coral'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            }
          }} />
        <Stack.Screen name="Login" component={Login}
          options={{
            title: 'Login Form',
            headerStyle: {
              backgroundColor: 'coral'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            }
          }} />
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false
          }} />
          <Stack.Screen name="UserDashboard" component={UserDashboard}
          options={{
            headerShown: false
          }} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
}

export default App;
