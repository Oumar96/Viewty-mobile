import React from "react";
import { View, StyleSheet } from "react-native";
import BaseImage from "../components/BaseImage.js";

const MovieDetails = ({ props }) => {
  const { room = {} } = props;
  const movie = room.result.movie;
  const users = room.participants.users;
  return (
    <View style={styles.movieDetails}>
      <BaseImage style={styles.movieImage} source={movie.poster} />
      <View style={styles.movieNameContainer}>
        <Text style={styles.movieName}>{movie.name}</Text>
      </View>

      <View style={styles.participants}>
        {users.map((user, index) => (
          <Text key={index} style={styles.participantName}>
            {/* {user} */} John Smith
          </Text>
        ))}
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  movieDetails: {},
  movieImage: {},
  movieNameContainer: {},
  movieName: {},
  participants: {},
  participantName: {},
});
