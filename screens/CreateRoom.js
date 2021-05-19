import React from "react";
import { View, Text, StyleSheet } from "react-native";

import SearchBar from "../components/SearchBar.js";

const CreateRoom = () => {
  return (
    <View style={styles.createRoom}>
      <SearchBar style={styles.searchBar} />
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  createRoom: {
    flex: 1,
    alignItems: "center",
  },
  searchBar: {
    marginVertical: 10,
    borderRadius: 20,
  },
});
