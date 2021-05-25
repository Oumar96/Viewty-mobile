//libs
import React, { useEffect, useState } from "react";
import firebase from "./firebase/firebase.js";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { FiraSans_400Regular } from "@expo-google-fonts/fira-sans";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// screens
import SignIn from "./screens/SignIn.js";
import Movies from "./screens/Movies.js";
import Home from "./screens/Home.js";
import ExpiredRoom from "./screens/ExpiredRoom.js";
import MovieDetails from "./screens/MovieDetails.js";

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};
const Stack = createSharedElementStackNavigator();

export default function App() {
  /***********
   * State
   ***********/
  const [currentUser, setCurrentUser] = useState(null);
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

  const sharedElementOptions = {
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
            ...sharedElementOptions,
          }}
          name="ExpiredRoom"
          component={ExpiredRoom}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            ...defaultScreenOptions,
            ...sharedElementOptions,
          }}
          name="MovieDetails"
          component={MovieDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
