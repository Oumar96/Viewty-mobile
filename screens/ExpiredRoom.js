import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { isNil } from "lodash";

//components
import MovieBanner from "../components/MovieBanner.js";
import RoomParticipants from "../components/RoomParticipants.js";
import MovieDescription from "../components/MovieDescription.js";

const ExpiredRoom = ({ route }) => {
  /***********
   * Data
   ***********/
  const room = route.params.room;
  const selectedMovie = room.result.movie;
  const roomUsers = room.participants.users;
  return (
    <View style={styles.expiredRoom}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.movieDetailsContainer}>
          <MovieBanner
            image={selectedMovie.poster}
            sharedElementId={`room-${room.id}`}
          />
          <MovieDescription movie={selectedMovie} />
          <RoomParticipants
            participants={roomUsers}
            style={styles.roomParticipants}
          />
        </View>
      </ScrollView>
    </View>
  );
};

ExpiredRoom.sharedElements = (route) => {
  const { room } = route.params;
  if (!isNil(room.result)) {
    return [
      {
        id: `room-${room.id}`,
        animation: "move",
        resize: "clip",
      },
    ];
  }
};

export default ExpiredRoom;

const styles = StyleSheet.create({
  movieDetailsContainer: {
    width: "100%",
    borderRadius: 20,
    borderColor: "#f2f2f2",
    alignSelf: "center",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  expiredRoom: {
    backgroundColor: "transparent",
  },
  roomParticipants: {
    marginBottom: 50,
  },
});
