import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { upperFirst } from "lodash";

// components
import BaseImage from "../components/BaseImage.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const MovieDetails = (props) => {
  const { movie = {} } = props;
  return (
    <View style={styles.movieDetailsContainer}>
      <View style={styles.movieImageContainer}>
        <BaseImage style={styles.movieImage} source={movie.poster} />
      </View>
      <View style={styles.movieNameContainer}>
        <Text style={styles.movieNameText}>{upperFirst(movie.name)}</Text>
      </View>
      <View style={styles.delimiter}></View>
      <View style={styles.movieDescription}>
        <Text>{movie.description}</Text>
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  movieDetailsContainer: {
    backgroundColor: "white",
  },
  movieImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: "4%",
    height: SCREEN_HEIGHT * 0.55,
    width: "100%",
  },
  movieImage: {
    height: "100%",
    width: "100%",
    borderWidth: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "#c9c9c9",
  },
  movieNameContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  movieNameText: {
    fontWeight: "600",
    fontSize: 35,
  },
  delimiter: {
    width: "92%",
    alignSelf: "center",
    borderTopWidth: 1,
    borderColor: "#c9c9c9",
  },
  movieDescription: {
    padding: "4%",
  },
});
