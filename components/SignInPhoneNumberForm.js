import React, { useRef, useState, useContext } from "react";
// libs
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase/firebase.js";
import { isEmpty } from "lodash";
// components
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import BaseButton from "./BaseButton.js";
// context
import SignInContext from "../contexts/SignInContext.js";

const SignInPhoneNumberForm = () => {
  const signInContext = useContext(SignInContext);
  /***********
   * State
   ***********/
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  /***********
   * Refs
   ***********/
  const recaptchaVerifier = useRef(null);

  /***********
   * Data
   ***********/
  const attemptInvisibleVerification = true;
  const errors = {
    "auth/captcha-check-failed":
      "reCAPTCHA failed please try again. If the problem persists contact support.",
    "auth/invalid-phone-number": "The phone number is invalid",
    "auth/missing-phone-number": "The phone number is missing",
    "auth/too-many-requests":
      "Your device is blocked due to too many requests. Try again later.",
    default:
      "There was an issue processing your request. Please contact support",
  };

  /***********
   * Methods
   ***********/
  const sendVerification = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const responseVerifcationID = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
    signInContext.mutations.setPhoneNumberVerificationId(responseVerifcationID);
  };

  const sendCode = async () => {
    try {
      setError("");
      await sendVerification();
      signInContext.actions.animateSignInContainerForward();
    } catch (e) {
      if (e.code !== "ERR_FIREBASE_RECAPTCHA_CANCEL") {
        !isEmpty(errors[e.code])
          ? setError(errors[e.code])
          : setError(errors["default"]);
      }
    } finally {
      Keyboard.dismiss();
    }
  };
  return (
    <View styles={styles.phoneNumberForm}>
      <PhoneInput
        onChangeFormattedText={setPhoneNumber}
        defaultCode="US"
        containerStyle={styles.containerStyle}
        textContainerStyle={styles.textContainerStyle}
      />
      {error !== "" && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={24} color="red" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {isEmpty(!phoneNumber) && (
        <View style={styles.sendCodeButtonContainer}>
          <BaseButton
            type="PRIMARY_NEGATIVE"
            onPress={sendCode}
            style={styles.sendCodeButton}
            text="Send Code"
          />
        </View>
      )}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
    </View>
  );
};

export default SignInPhoneNumberForm;

const styles = StyleSheet.create({
  phoneNumberForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  containerStyle: {
    borderRadius: 10,
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    width: 350,
  },
  textContainerStyle: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  errorContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    width: 350,
  },
  errorText: {
    fontWeight: "800",
    color: "red",
    marginLeft: 10,
  },
  sendCodeButtonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  sendCodeButton: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
  },
});
