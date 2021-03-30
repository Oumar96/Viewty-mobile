//libs
import React, { useEffect, useState } from "react";
import firebase from "./firebase/firebase.js";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import SignIn from "./screens/SignIn.js";
import Movies from "./screens/Movies.js";
import Home from "./screens/Home.js";

const Stack = createStackNavigator();

export default function App() {
  /***********
   * State
   ***********/
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  /***********
   * Methods
   ***********/
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
          name="SignIn"
          component={SignIn}
        />
      </>
    );
  };
  const getSignInFirst = () => {
    return (
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </>
    );
  };
  const getInitialScreenInOrder = () => {
    let initialScreenInOrder = null;
    if (isSignedIn) {
      initialScreenInOrder = getHomeFirst();
    } else {
      initialScreenInOrder = getSignInFirst();
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
        setCurrentUser(user);
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
