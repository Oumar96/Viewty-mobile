import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BaseImage from "../components/BaseImage.js";

const MovieDetails = (props) => {
  const { movie = {} } = props;
  return (
    <View style={styles.movieDetails}>
      <BaseImage style={styles.movieImage} source={movie.poster} />
      <View style={styles.movieNameContainer}>
        <Text style={styles.movieName}>{movie.name}</Text>
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  movieDetails: {
    flex: 1,
  },
  movieImage: {
    flex: 2,
    height: "100%",
  },
  movieNameContainer: {
    flex: 2,
  },
  movieName: {},
});
