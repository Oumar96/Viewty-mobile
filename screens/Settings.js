import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import firebase from "../firebase/firebase.js";

import BaseModal from "../components/BaseModal.js";

const Settings = () => {
  const [isShowingErrorModal, setIsShowingErrorModal] = useState(false);

  const navigation = useNavigation();
  const errorModalText =
    "An error occured! Please try again. If the error persists contact support.";

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("SignIn");
    } catch (error) {
      setIsShowingErrorModal(true);
    }
  };
  return (
    <View style={styles.settings}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.setting, styles.option]}
        >
          <AntDesign name="adduser" size={24} color="black" />
          <Text style={styles.optionText}>Follow and invite friends</Text>
          <AntDesign
            name="right"
            size={16}
            color="black"
            style={styles.optionRight}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.setting, styles.option]}
        >
          <AntDesign name="infocirlceo" size={24} color="black" />
          <Text style={styles.optionText}>About</Text>
          <AntDesign
            name="right"
            size={16}
            color="black"
            style={styles.optionRight}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.setting, styles.optionRed]}
          onPress={logout}
        >
          <Text style={styles.optionCenterText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.setting, styles.optionRed]}
        >
          <Text style={styles.optionCenterText}>Delete account</Text>
        </TouchableOpacity>
      </View>
      <BaseModal
        isVisible={isShowingErrorModal}
        buttonAction={() => setIsShowingErrorModal(false)}
        text={errorModalText}
        buttonType={"SECONDARY_NEGATIVE"}
        buttonText={"Close"}
      />
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
