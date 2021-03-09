import React, { useRef, useState, useContext } from "react";
// components
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
// context
import HomeContext from "../contexts/HomeContext.js";
// libs
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase/firebase.js";
import { isEmpty } from "lodash";

const HomePhoneNumberForm = () => {
  const homeContext = useContext(HomeContext);
  /***********
   * State
   ***********/
  const [sendCodeTextColor, setSendCodeTextColor] = useState({
    color: "#0f9bf2",
  });
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
    homeContext.mutations.setPhoneNumberVerificationId(responseVerifcationID);
  };

  const sendCode = async () => {
    try {
      setError("");
      await sendVerification();
      homeContext.actions.animateHomeContainerForward();
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
      <View style={styles.sendCodeButtonContainer}>
        <TouchableHighlight
          style={styles.sendCodeButton}
          underlayColor="#0f9bf2"
          onShowUnderlay={() => {
            setSendCodeTextColor({ color: "white" });
          }}
          onHideUnderlay={() => {
            setSendCodeTextColor({ color: "#0f9bf2" });
          }}
          onPress={sendCode}
        >
          <Text style={[styles.sendCodeText, sendCodeTextColor]}>
            Send Code
          </Text>
        </TouchableHighlight>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
    </View>
  );
};

export default HomePhoneNumberForm;

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
    borderWidth: 1,
    borderColor: "#0f9bf2",
  },
  sendCodeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f9bf2",
  },
});
