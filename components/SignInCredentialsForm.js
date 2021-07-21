import React, { useRef, useState, useContext } from "react";
// libs
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../firebase/firebase.js";
import { isEmpty } from "lodash";
// components
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TextInput,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BaseButton from "./BaseButton.js";
// context
import SignInContext from "../contexts/SignInContext.js";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SignInCredentialsForm = () => {
  const signInContext = useContext(SignInContext);
  /***********
   * State
   ***********/
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // update this
    "auth/captcha-check-failed":
      "reCAPTCHA failed please try again. If the problem persists contact support.",
    "auth/invalid-phone-number": "The phone number is invalid",
    "auth/missing-phone-number": "The phone number is missing",
    "auth/too-many-requests":
      "Your device is blocked due to too many requests. Try again later.",
    default:
      "There was an issue processing your request. Please contact support",
  };

  const isShowingSendCodeButton = !isEmpty(email) && !isEmpty(password);

  /***********
   * Methods
   ***********/
  const sendVerification = async () => {
    // update this
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const responseVerifcationID = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
    signInContext.mutations.setPhoneNumberVerificationId(responseVerifcationID);
  };

  const sendCode = async () => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log("idToken", idToken);
      //post token to endpoint
      //
      navigateToRooms();
    } catch (error) {
      console.log(error);
      // handle this
    } finally {
      Keyboard.dismiss();
    }
    // update this
    // try {
    //   setError("");
    //   await sendVerification();
    //   signInContext.actions.animateSignInContainerForward();
    // } catch (e) {
    //   if (e.code !== "ERR_FIREBASE_RECAPTCHA_CANCEL") {
    //     !isEmpty(errors[e.code])
    //       ? setError(errors[e.code])
    //       : setError(errors["default"]);
    //   }
    // } finally {
    //   Keyboard.dismiss();
    // }
  };
  return (
    <View styles={styles.credentialsForm}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputEmail]}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          multiline={false}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      {!isEmpty(error) && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={24} color="red" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {isShowingSendCodeButton && (
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

export default SignInCredentialsForm;

const styles = StyleSheet.create({
  credentialsForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputContainer: {
    borderRadius: 10,
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    width: SCREEN_WIDTH * 0.75,
    height: 120,
    backgroundColor: "white",
    borderColor: "#bababa",
    borderWidth: 2,
  },
  input: {
    fontSize: 17,
    height: "50%",
    paddingHorizontal: 15,
  },
  inputEmail: {
    borderBottomWidth: 1,
    borderColor: "#f2f2f2",
  },
  errorContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
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
    width: "80%",
    height: 50,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
  },
});
