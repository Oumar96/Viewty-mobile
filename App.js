import React, { useEffect, useState } from "react";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home.js";
import Movies from "./screens/Movies.js";
import Rooms from "./screens/Rooms.js";

//libs
import firebase from "./firebase/firebase.js";

const Stack = createStackNavigator();

export default function App() {
  /***********
   * State
   ***********/
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  /***********
   * Methods
   ***********/
  const getRoomsFirst = () => {
    return (
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Rooms"
          component={Rooms}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </>
    );
  };
  const getHomeFirst = () => {
    return (
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Rooms"
          component={Rooms}
        />
      </>
    );
  };
  const getInitialScreenInOrder = () => {
    let initialScreenInOrder = null;
    if (isSignedIn) {
      initialScreenInOrder = getRoomsFirst();
    } else {
      initialScreenInOrder = getHomeFirst();
    }
    return initialScreenInOrder;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken(true)
          .then(function (idToken) {
            console.log("===========");
            console.log(idToken);
          })
          .catch(function (error) {
            console.log(error);
          });
        setUser(user);
        setIsSignedIn(true);
        // navigation.navigate("Room");
      }
      setIsLoading(false);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // Must be updated before release
  }

  if (isLoading) {
    return null; // Update this too
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {getInitialScreenInOrder()}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Movies"
          component={Movies}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
