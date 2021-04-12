import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreateRoom = () => {
  return (
    <View style={styles.createRoom}>
      <Text>Create Room</Text>
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  createRoom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
