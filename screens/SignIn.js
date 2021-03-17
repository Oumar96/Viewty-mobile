import React, { useRef, useState } from "react";
// components
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import SignInPhoneNumberForm from "../components/SignInPhoneNumberForm.js";
import SignInCodeConfirmation from "../components/SignInCodeConfirmation.js";
import BaseButton from "../components/BaseButton.js";
// context
import SignInContext from "../contexts/SignInContext.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const SignIn = ({ navigation }) => {
  /***********
   * Refs
   ***********/
  const signInNumberPhonePosition = useRef(new Animated.Value(0)).current;

  /***********
   * State
   ***********/
  const [currentContainerPosition, setCurrentContainerPosition] = useState(0);
  const [isShowingGetStartedButton, setIsShowingGetStartedButton] = useState(
    true
  );
  const [phoneNumberVerificationId, setPhoneNumberVerificationId] = useState(
    ""
  );

  /***********
   * Data
   ***********/
  const signInPhoneNumberTranslate = {
    transform: [
      {
        translateX: signInNumberPhonePosition,
      },
    ],
  };

  /***********
   * Methods
   ***********/
  const getStarted = () => {
    setIsShowingGetStartedButton(false);
    animateSignInContainerForward();
  };
  const animateSignInContainerForward = () => {
    Animated.timing(signInNumberPhonePosition, {
      toValue: currentContainerPosition - SCREEN_WIDTH,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setCurrentContainerPosition(currentContainerPosition - SCREEN_WIDTH);
  };
  const animateSignInContainerBackward = () => {
    Animated.timing(signInNumberPhonePosition, {
      toValue: currentContainerPosition + SCREEN_WIDTH,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setCurrentContainerPosition(currentContainerPosition + SCREEN_WIDTH);
  };

  const navigateToRooms = () => {
    navigation.navigate("Rooms");
  };

  return (
    <SignInContext.Provider
      value={{
        state: {
          phoneNumberVerificationId,
        },
        mutations: {
          setPhoneNumberVerificationId,
        },
        actions: {
          animateSignInContainerForward,
          animateSignInContainerBackward,
          navigateToRooms,
        },
      }}
    >
      <ImageBackground
        style={styles.image}
        source={require("../assets/popcorn.jpg")}
      >
        <View style={styles.container}>
          <Animated.View style={[styles.content, signInPhoneNumberTranslate]}>
            <View style={styles.welcomeMessageContainer}>
              <Text style={styles.welcomeText}>WELCOME TO VIEWTY</Text>
              <Text style={styles.swipeWithFriendsText}>
                Swipe with friends and find the perfect film for movie night
              </Text>
            </View>
            <View style={styles.signInPhoneNumberFormContainer}>
              <SignInPhoneNumberForm />
            </View>
            <View style={styles.signInCodeConfirmationContainer}>
              <SignInCodeConfirmation />
            </View>
          </Animated.View>
          <View style={styles.footer}>
            {isShowingGetStartedButton && (
              <BaseButton
                type="PRIMARY"
                style={styles.getStarted}
                onPress={getStarted}
                text="Get started"
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </SignInContext.Provider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "space-around",
    height: "100%",
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.75,
    width: SCREEN_WIDTH * 3,
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  welcomeMessageContainer: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  welcomeText: {
    fontSize: 30,
    color: "white",
    fontWeight: "800",
  },
  swipeWithFriendsText: {
    fontSize: 18,
    color: "#dbd8d7",
    textAlign: "center",
    width: 300,
    marginTop: 20,
  },
  signInPhoneNumberFormContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  signInCodeConfirmationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  getStarted: {
    borderRadius: 10,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
    height: 50,
    width: SCREEN_WIDTH - 50,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});
