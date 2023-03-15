import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './components/Home';
import { Login } from './components/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  const handlelogout = (props) => {
    props.navigation.navigate("Login")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login}
          options={{
            title: 'LMS',
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
            headerRight: () => <Button title='Logout' onPress={(props) => handlelogout(props)} />,
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center'
            }
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
