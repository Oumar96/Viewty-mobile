import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { isEmpty, upperFirst } from "lodash";

import MoviesContext from "../contexts/MoviesContext.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

/**
 *
 * @param {String} image
 * @returns {uri}
 */
const getMovieImageInitialState = (image) => {
  return isEmpty(image) ? require("../assets/1.jpg") : { uri: image };
};
const Match = () => {
  const moviesContext = useContext(MoviesContext);

  /***********
   * Context State
   ***********/
  const matchedMovie = moviesContext.state.matchedMovie;

  /***********
   * Context Mutations
   ***********/
  const setMatchedMovie = moviesContext.mutations.setMatchedMovie;

  /***********
   * Context Actions
   ***********/
  const endRoom = moviesContext.actions.endRoom;

  /***********
   * State
   ***********/
  const [movieImage, setMovieImage] = useState(
    getMovieImageInitialState(matchedMovie.poster)
  );
  const [
    contineRoomButtonContentColor,
    setContinueRoomButtonTextColor,
  ] = useState({ color: "white" });
  /***********
   * Methods
   ***********/
  const setMovieImageToDefault = () => {
    setMovieImage(require("../assets/1.jpg"));
  };
  const continueSwipping = () => {
    setMatchedMovie(null);
  };
  const completeRoom = async () => {
    try {
      await endRoom();
    } catch (error) {
      //handle error
    } finally {
      setMatchedMovie(null);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.newMatch}>
        <Text style={styles.newMatchText}>New Match!</Text>
      </View>
      <View style={styles.movieMatched}>
        <Text style={styles.bothLikeText}>You and your friend both liked</Text>
        <Text style={styles.movieNameText}>
          {upperFirst(matchedMovie.name)}
        </Text>
        <Image
          style={styles.movieImage}
          source={movieImage}
          onError={setMovieImageToDefault}
        />
      </View>
      <View style={styles.choiceButtons}>
        <TouchableHighlight
          style={styles.button}
          onPress={completeRoom}
          underlayColor="#0f9bf2"
        >
          <View style={styles.buttonContent}>
            <AntDesign
              name="checkcircleo"
              style={styles.icon}
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>Complete Room</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={continueSwipping}
          underlayColor="white"
          onShowUnderlay={() => {
            setContinueRoomButtonTextColor({ color: "black" });
          }}
          onHideUnderlay={() => {
            setContinueRoomButtonTextColor({ color: "white" });
          }}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons
              name="swipe"
              style={[styles.icon, contineRoomButtonContentColor]}
              size={24}
              color="white"
            />
            <Text style={[styles.buttonText, contineRoomButtonContentColor]}>
              Continue Swipping
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 40,
    paddingRight: 40,
    zIndex: 1000,
  },
  newMatch: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  newMatchText: {
    color: "white",
    fontSize: 40,
    fontFamily: "Pacifico_400Regular",
  },
  movieMatched: {
    flex: 4,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
  },
  choiceButtons: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  movieImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  bothLikeText: {
    fontSize: 22,
    color: "white",
  },
  movieNameText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    width: 250,
    height: 50,
    justifyContent: "center",
    color: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginRight: 15,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});
