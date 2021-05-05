import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RoomParticipants = (props) => {
  const { participants = [], style = {} } = props;

  return (
    <View style={[styles.participants, style]}>
      <Text style={styles.participantsTitle}>Participants</Text>
      {participants.map((user, index) => (
        // <Text>{user.name}</Text>
        <View
          style={styles.participantRow}
          key={`Room-participants${index + 1}`}
        >
          <FontAwesome name="user-circle-o" size={24} color="black" />
          <Text style={styles.participantName}>{"John Smith"}</Text>
        </View>
      ))}
    </View>
  );
};

export default RoomParticipants;

const styles = StyleSheet.create({
  participants: {
    padding: "5%",
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  participantsTitle: {
    fontWeight: "600",
    fontSize: 25,
    marginBottom: 10,
  },
  participantRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 10,
  },
  participantName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
});
