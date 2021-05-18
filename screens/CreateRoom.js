import React from "react";
import { View, Text, StyleSheet } from "react-native";

import SearchBar from "../components/SearchBar.js";

const CreateRoom = () => {
  return (
    <View style={styles.createRoom}>
      <SearchBar />
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
