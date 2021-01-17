
import React from 'react';
import Home from "./screens/Home.js";
import Movies from "./screens/Movies.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Movies" component={Movies} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


