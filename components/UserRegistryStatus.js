import React from "react";
import { View, StyleSheet } from "react-native";
import BaseButton from "./BaseButton";

const UserRegistryStatus = () => {
  return (
    <View style={styles.container}>
      <BaseButton style={styles.choice} text="New User" />
      <BaseButton
        style={styles.choice}
        text="Already a user"
        type="PRIMARY_NEGATIVE"
      />
    </View>
  );
};

export default UserRegistryStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  choice: {
    height: 50,
    marginVertical: 20,
    borderRadius: 20,
    width: "50%",
  },
});
