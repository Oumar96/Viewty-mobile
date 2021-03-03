import React, { useState, useRef } from "react";
// components
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import HomePhoneNumberForm from "../components/HomePhoneNumberForm.js";
import HomeCodeConfirmation from "../components/HomeCodeConfirmation.js";
// context
import HomeContext from "../contexts/HomeContext.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Home = () => {
  const homeNumberPhonePosition = useRef(new Animated.Value(0)).current;
  const [currentContainerPosition, setCurrentContainerPosition] = useState(0);
  const [isShowingGetStartedButton, setIsShowingGetStartedButton] = useState(
    true
  );
  const [phoneNumberVerificationId, setPhoneNumberVerificationId] = useState(
    ""
  );

  const getStarted = () => {
    setIsShowingGetStartedButton(false);
    animateHomeContainerForward();
  };
  const animateHomeContainerForward = () => {
    Animated.timing(homeNumberPhonePosition, {
      toValue: currentContainerPosition - SCREEN_WIDTH,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setCurrentContainerPosition(currentContainerPosition - SCREEN_WIDTH);
  };
  const animateHomeContainerBackward = () => {
    Animated.timing(homeNumberPhonePosition, {
      toValue: currentContainerPosition + SCREEN_WIDTH,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setCurrentContainerPosition(currentContainerPosition + SCREEN_WIDTH);
  };
  const homePhoneNumberTranslate = {
    transform: [
      {
        translateX: homeNumberPhonePosition,
      },
    ],
  };

  return (
    <HomeContext.Provider
      value={{
        state: {
          phoneNumberVerificationId,
        },
        mutations: {
          setPhoneNumberVerificationId,
        },
        actions: {
          animateHomeContainerForward,
          animateHomeContainerBackward,
        },
      }}
    >
      <ImageBackground
        style={styles.image}
        source={require("../assets/popcorn.jpg")}
      >
        <View style={styles.container}>
          <Animated.View style={[styles.content, homePhoneNumberTranslate]}>
            <View style={styles.welcomeMessageContainer}>
              <Text style={styles.welcomeText}>WELCOME TO VIEWTY</Text>
              <Text style={styles.swipeWithFriendsText}>
                Swipe with friends and find the perfect film for movie night
              </Text>
            </View>
            <View style={styles.homePhoneNumberFormContainer}>
              <HomePhoneNumberForm />
            </View>
            <View style={styles.homeCodeConfirmationContainer}>
              <HomeCodeConfirmation />
            </View>
          </Animated.View>
          <View style={styles.footer}>
            {isShowingGetStartedButton && (
              <TouchableHighlight
                style={styles.getStarted}
                underlayColor="#8dc3f0"
                onPress={getStarted}
              >
                <Text style={styles.getStartedText}>Get started</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </ImageBackground>
    </HomeContext.Provider>
  );
};

export default Home;

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
  homePhoneNumberFormContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  homeCodeConfirmationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  getStarted: {
    backgroundColor: "#0f9bf2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
    height: 50,
    width: SCREEN_WIDTH - 50,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});
