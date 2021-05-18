//libs
import React, { useEffect, useState } from "react";
import firebase from "./firebase/firebase.js";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { FiraSans_400Regular } from "@expo-google-fonts/fira-sans";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// screens
import SignIn from "./screens/SignIn.js";
import Movies from "./screens/Movies.js";
import Home from "./screens/Home.js";
import ExpiredRoom from "./screens/ExpiredRoom.js";

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};
const Stack = createSharedElementStackNavigator();

export default function App() {
  /***********
   * State
   ***********/
  const [currentUser, setCurrentUser] = useState(5145753394);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    FiraSans_400Regular,
  });

  /***********
   * Data
   ***********/
  const headerTitleStyle = {
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Pacifico_400Regular",
  };
  const headerStyle = {
    height: 100,
  };
  const defaultScreenOptions = {
    headerStyle,
    headerTitleStyle,
  };

  const expiredRoomOptions = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };
  /***********
   * Methods
   ***********/
  const getHomeScreen = () => {
    return (
      <Stack.Screen
        options={{
          title: "Viewty",
          ...defaultScreenOptions,
        }}
        name="Home"
        component={Home}
        initialParams={{
          userId: currentUser.userId,
        }}
      />
    );
  };
  const getSignInScreen = () => {
    return (
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
      </>
    );
  };
  const getHomeFirst = () => {
    return (
      <>
        {getHomeScreen()}
        {getSignInScreen()}
      </>
    );
  };
  const getSignInFirst = () => {
    return (
      <>
        {getSignInScreen()}
        {getHomeScreen()}
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

  const setTokenForUser = async (token) => {
    try {
      console.log("token", token);
      await AsyncStorage.setItem("@key", token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        //make request to get user's session id and
        //set it using AsyncStorage
        user
          .getIdToken(true)
          .then(async function (idToken) {
            setTokenForUser(idToken);
          })
          .catch(function (error) {
            console.log(error);
          });
        // setCurrentUser(user);
        setCurrentUser({
          userId: "5145753394", // mock
        });
        // setIsSignedIn(true); // this will do normal authentication flow
        setIsSignedIn(false); // this will force to show sign in page
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
      <Stack.Navigator screenOptions={TransitionScreenOptions}>
        {getInitialScreenInOrder()}
        <Stack.Screen
          options={defaultScreenOptions}
          name="Movies"
          component={Movies}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            ...defaultScreenOptions,
            ...expiredRoomOptions,
          }}
          name="ExpiredRoom"
          component={ExpiredRoom}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
