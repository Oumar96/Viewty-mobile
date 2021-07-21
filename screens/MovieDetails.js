import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { isNil } from "lodash";

//components
import MovieBanner from "../components/MovieBanner.js";
import MovieDescription from "../components/MovieDescription.js";

const MovieDetails = ({ route }) => {
  /***********
   * Data
   ***********/
  const movie = route.params.movie;
  return (
    <View style={styles.movieDetails}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.movieDetailsContent}>
          <MovieBanner
            image={movie.poster}
            sharedElementId={`movie-${movie.id}`}
          />
          <MovieDescription movie={movie} />
        </View>
      </ScrollView>
    </View>
  );
};

MovieDetails.sharedElements = (route) => {
  const movie = !isNil(route.params) ? route.params.movie : null;
  if (!isNil(movie)) {
    return [
      {
        id: `movie-${movie.id}`,
        animation: "move",
        resize: "clip",
      },
    ];
  }
};

export default MovieDetails;

const styles = StyleSheet.create({
  movieDetails: {
    backgroundColor: "transparent",
    height: "100%",
  },
  movieDetailsContent: {
    width: "100%",
    borderRadius: 20,
    borderColor: "#f2f2f2",
    alignSelf: "center",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
});
