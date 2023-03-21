import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './components/Home';
import { Login } from './components/Login';
import Dashboard from './components/home/Dashboard';
import Signup from './components/signup/Signup';

const Stack = createNativeStackNavigator();

const App = () => {
  const handlelogout = (props) => {
    props.navigation.navigate("Login")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{headerShown: false}} name="Dashboard" component={Dashboard} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
