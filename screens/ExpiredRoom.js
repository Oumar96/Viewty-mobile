import React from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { isNil } from "lodash";

// context
import ExpiredRoomContext from "../contexts/ExpiredRoomContext.js";

//components
import MovieDetails from "../components/MovieDetails.js";

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
      <SafeAreaView style={styles.expiredRoom}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MovieDetails
            movie={selectedMovie}
            sharedElementId={`room-${room.id}`}
          />
          <View style={styles.participants}>
            <Text style={styles.participantsTitle}>Participants</Text>
            {roomUsers.map((user, index) => (
              // <Text>{user.name}</Text>
              <View
                style={styles.participantRow}
                key={`expiredRoom-user${index + 1}`}
              >
                <FontAwesome name="user-circle-o" size={24} color="black" />
                <Text style={styles.participantName}>{"John Smith"}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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
  participants: {
    padding: "5%",
  },
  participantsTitle: {
    fontWeight: "600",
    fontSize: 25,
    marginBottom: 10,
  },
  participantName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  participantRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 10,
  },
});
