import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
// libs
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

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { MaterialIcons } from "@expo/vector-icons";
import BaseButton from "./BaseButton.js";

import { setTokenForUser } from "../helpers/authentication.js";

const SCREEN_WIDTH = Dimensions.get("window").width;

const LoginForm = () => {
  const currentUserContext = useContext(CurrentUserContext);
  /***********
   * Context Mutations
   ***********/
  const setCurrentUser = currentUserContext.mutations.setCurrentUser;

  /***********
   * State
   ***********/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /***********
   * Data
   ***********/
  const navigation = useNavigation();
  const isShowingSendCodeButton = !isEmpty(email) && !isEmpty(password);

  /***********
   * Methods
   ***********/

  const navigateToHome = (userId) => {
    navigation.navigate("Home", {
      userId,
    });
  };

  const login = async () => {
    try {
      setError("");
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userId = userCredential.user.uid;
      const idToken = await user.getIdToken();
      setTokenForUser(idToken);
      setCurrentUser({
        userId,
        email,
      });
      navigateToHome(userCredential.user.uid);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      Keyboard.dismiss();
    }
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
            onPress={login}
            style={styles.sendCodeButton}
            text="Login"
          />
        </View>
      )}
    </View>
  );
};

export default LoginForm;

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
