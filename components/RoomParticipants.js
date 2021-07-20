import React from "react";
import { StyleSheet, View, Text } from "react-native";

import UserItem from "./UserItem.js";

const RoomParticipants = (props) => {
  const { participants = [], style = {} } = props;

  return (
    <View style={[styles.participants, style]}>
      <Text style={styles.participantsTitle}>Participants</Text>
      {participants.map((user, index) => (
        <UserItem
          user={user}
          key={`Room-participants${index + 1}`}
          style={styles.participantRow}
        />
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
    marginBottom: 10,
  },
});
