import React from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

//components
import MovieDetails from "../components/MovieDetails.js";

const ExpiredRoom = ({ route }) => {
  /***********
   * Data
   ***********/
  const room = route.params.room;
  const selectedMovie = room.result.movie;
  const roomUsers = room.participants.users;
  return (
    <SafeAreaView style={styles.expiredRoom}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieDetails movie={selectedMovie} />
        <View style={styles.delimiter}></View>
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
  );
};

export default ExpiredRoom;

const styles = StyleSheet.create({
  expiredRoom: {
    backgroundColor: "white",
  },
  participants: {
    padding: "5%",
  },
  delimiter: {
    width: "92%",
    alignSelf: "center",
    borderTopWidth: 1,
    borderColor: "#c9c9c9",
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
