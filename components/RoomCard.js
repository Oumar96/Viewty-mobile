import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RoomCard = (props) => {
  const { room = {} } = props;

  return (
    <View style={styles.roomCard}>
      <Text>{room.id}</Text>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  roomCard: {
    flex: 1,
    backgroundColor: "red",
    marginTop: 15,
  },
});
