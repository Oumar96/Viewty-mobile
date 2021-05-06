import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Settings = () => {
  return (
    <View style={styles.settings}>
      <View style={styles.container}>
        <Pressable style={[styles.setting, styles.option]}>
          <AntDesign name="adduser" size={24} color="black" />
          <Text style={styles.optionText}>Follow and invite friends</Text>
          <AntDesign
            name="right"
            size={16}
            color="black"
            style={styles.optionRight}
          />
        </Pressable>
        <Pressable style={[styles.setting, styles.option]}>
          <AntDesign name="infocirlceo" size={24} color="black" />
          <Text style={styles.optionText}>About</Text>
          <AntDesign
            name="right"
            size={16}
            color="black"
            style={styles.optionRight}
          />
        </Pressable>
        <Pressable style={[styles.setting, styles.optionRed]}>
          <Text style={styles.optionCenterText}>Logout</Text>
        </Pressable>
        <Pressable style={[styles.setting, styles.optionRed]}>
          <Text style={styles.optionCenterText}>Delete account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settings: {
    flex: 1,
  },
  container: {
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  setting: {
    backgroundColor: "white",
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  option: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  optionText: {
    justifyContent: "center",
    marginLeft: 15,
  },
  optionRight: {
    marginLeft: "auto",
  },
  optionRed: {
    justifyContent: "center",
    height: 60,
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    borderColor: "#c9c9c9",
  },
  optionCenterText: {
    color: "red",
  },
});
