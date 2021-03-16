import React, { useState, useContext } from "react";
//components
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import BaseButton from "./BaseButton.js";
// context
import HomeContext from "../contexts/HomeContext.js";
// libs
import firebase from "../firebase/firebase.js";

const HomeCodeConfirmation = () => {
  const homeContext = useContext(HomeContext);
  /***********
   * Context State
   ***********/
  const phoneNumberVerificationId = homeContext.state.phoneNumberVerificationId;
  /***********
   * Context Actions
   ***********/
  const navigateToRooms = homeContext.actions.navigateToRooms;
  const animateHomeContainerBackward =
    homeContext.actions.animateHomeContainerBackward;
  /***********
   * State
   ***********/
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");

  /***********
   * Methods
   ***********/
  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        phoneNumberVerificationId,
        phoneVerificationCode
      );
      await firebase.auth().signInWithCredential(credential);
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      console.log(credential);
      navigateToRooms();
    } catch (error) {
      // handle this
    } finally {
      Keyboard.dismiss();
    }
  };

  return (
    <View styles={styles.codeConfirmation}>
      <TextInput
        placeholder="Code"
        onChangeText={setPhoneVerificationCode}
        style={styles.confirmationCodeInput}
      />
      <View style={styles.confirmCodedButtonContainer}>
        <BaseButton
          type="PRIMARY_NEGATIVE"
          style={styles.confirmCodeButton}
          onPress={confirmCode}
          text="Confirm Code"
        />
        <BaseButton
          type="SECONDARY_NEGATIVE"
          style={styles.cancelButton}
          onPress={animateHomeContainerBackward}
          text="Cancel"
        />
      </View>
    </View>
  );
};

export default HomeCodeConfirmation;

const styles = StyleSheet.create({
  codeConfirmation: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 350,
  },
  confirmationCodeInput: {
    borderRadius: 10,
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    width: 200,
    height: 70,
    borderWidth: 1,
    borderColor: "#cdcccf",
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmCodedButtonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  confirmCodeButton: {
    width: 300,
    height: 50,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
  },
  cancelButton: {
    width: 300,
    height: 50,
    marginTop: 10,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
    borderColor: "red",
    borderWidth: 1,
  },
});
