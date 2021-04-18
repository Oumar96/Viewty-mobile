import React from "react";
import { View, StyleSheet } from "react-native";
//components
import MovieDetails from "../components/MovieDetails.js";

const ExpiredRoom = ({ route }) => {
  /***********
   * Data
   ***********/
  const room = route.params.room;
  const selectedMovie = room.result.movie;
  return (
    <View style={styles.expiredRoom}>
      <MovieDetails movie={selectedMovie} />
    </View>
  );
};

export default ExpiredRoom;

const styles = StyleSheet.create({
  expiredRoom: {
    flex: 1,
  },
});
