import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Rooms = () => {
  return (
    <View style={styles.rooms}>
      <Text>Rooms</Text>
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  rooms: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
