
import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "../firebase/firebase.js";

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const responseVerifcationID = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
    setVerificationId(responseVerifcationID);
  }

  const confirmCode = async () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    await firebase.auth().signInWithCredential(credential)
  }

  return (

    <>
        <View style={styles.container}>
            <TextInput
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                autoCompleteType="tel"
                style={styles.option}
            />
            <TouchableOpacity style={styles.button} onPress={sendVerification}>
                <Text style={styles.option}>Send Verification Code</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TextInput
                placeholder="Confirmation Code"
                onChangeText={setCode}
                style={styles.option}
            />
            <TouchableOpacity style={styles.button} onPress={confirmCode}>
                <Text style={styles.option}>Verify Code</Text>
            </TouchableOpacity>
        </View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
    </>

  );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea"
    },
    button: {
        top: 200,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#ffffff",
    },
    option:{
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    }
  });

