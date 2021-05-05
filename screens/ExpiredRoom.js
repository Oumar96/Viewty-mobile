import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { isNil } from "lodash";

// context
import ExpiredRoomContext from "../contexts/ExpiredRoomContext.js";

//components
import MovieDetails from "../components/MovieDetails.js";
import RoomParticipants from "../components/RoomParticipants.js";

const ExpiredRoom = ({ navigation, route }) => {
  /***********
   * Data
   ***********/
  const room = route.params.room;
  const selectedMovie = room.result.movie;
  const roomUsers = room.participants.users;
  return (
    <ExpiredRoomContext.Provider
      value={{
        state: {
          navigation,
        },
      }}
    >
      <View style={styles.expiredRoom}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MovieDetails
            movie={selectedMovie}
            sharedElementId={`room-${room.id}`}
          />
          <RoomParticipants
            participants={roomUsers}
            style={styles.roomParticipants}
          />
        </ScrollView>
      </View>
    </ExpiredRoomContext.Provider>
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
  expiredRoom: {
    backgroundColor: "transparent",
  },
  roomParticipants: {
    marginBottom: 50,
  },
});
