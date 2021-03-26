import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopNavBar = () => {
  return (
    <View style={styles.topNavBar}>
      <Text style={styles.topNavBarText}>Viewty</Text>
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  topNavBar: {
    backgroundColor: "white",
    width: "100%",
    height: 120,
    top: 0,
    position: "absolute",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
  },
  topNavBarText: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 35,
    paddingTop: 15,
  },
});
