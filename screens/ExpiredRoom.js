import React from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
//components
import MovieDetails from "../components/MovieDetails.js";

const ExpiredRoom = ({ route }) => {
  /***********
   * Data
   ***********/
  const room = route.params.room;
  const selectedMovie = room.result.movie;
  return (
    <SafeAreaView style={styles.expiredRoom}>
      <ScrollView>
        <MovieDetails movie={selectedMovie} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpiredRoom;

const styles = StyleSheet.create({
  expiredRoom: {
    backgroundColor: "white",
  },
});
