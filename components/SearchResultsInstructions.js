import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchResultsInstructions = (props) => {
  const { style = {} } = props;
  return (
    <View style={[styles.instructions, style]}>
      <Ionicons name="happy-outline" size={50} color="#b5b5b5" />
      <Text style={styles.instructionsText}>
        Find your friends and start swipping movies.
      </Text>
    </View>
  );
};

export default SearchResultsInstructions;

const styles = StyleSheet.create({
  instructions: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 200,
    borderRadius: 20,
    elevation: 7,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  instructionsText: {
    marginTop: 10,
    color: "#b5b5b5",
    fontSize: 16,
  },
});
