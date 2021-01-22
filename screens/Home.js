
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Animated, TextInput, ImageBackground,TouchableHighlight, TouchableOpacity} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "../firebase/firebase.js";
import HomePhoneNumberForm from '../components/HomePhoneNumberForm.js';

const SCREEN_WIDTH = Dimensions.get('window').width

const Home = () => {
    const homeNumberPhonePosition = useRef(new Animated.Value(SCREEN_WIDTH)).current;
    const [isShowingGetStartedButton, setIsShowingGetStartedButton] = useState(true);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [code, setCode] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const recaptchaVerifier = useRef(null);

//   const sendVerification = async () => {
//     const phoneProvider = new firebase.auth.PhoneAuthProvider();
//     const responseVerifcationID = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
//     setVerificationId(responseVerifcationID);
//   }

//   const confirmCode = async () => {
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       code
//     );
//     await firebase.auth().signInWithCredential(credential)
//   }
    const showHomePhoneNumber = () =>{
        setIsShowingGetStartedButton(false);
        Animated.timing(homeNumberPhonePosition, {
            toValue:0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }
    const homePhoneNumberTranslate = {
        transform:[{
            translateX: homeNumberPhonePosition,
        }]
    }

    return (
        <>
            <ImageBackground
                style={styles.image}
                source={require('../assets/popcorn.jpg')}
            >
                <Animated.View style={[styles.container, homePhoneNumberTranslate]} >
                    <HomePhoneNumberForm />
                </Animated.View>
                <View style={styles.footer}>
                    {isShowingGetStartedButton &&
                        <TouchableHighlight style={styles.getStarted} onPress={showHomePhoneNumber}>
                            <Text style={styles.getStartedText}>Get started</Text>
                        </TouchableHighlight>
                    }
                </View>
                {/* <View style={styles.container}>
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
                /> */}
            </ImageBackground>
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        justifyContent:"space-around",
        alignItems: 'center',
        marginBottom:50,
    },
    getStarted:{
        backgroundColor: "#f77ea7",
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        width:"60%",
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 3,
        shadowOpacity: 0.15,
        height: 50
    },
    getStartedText:{
        fontSize: 16,
        fontWeight: "800",
        color: "white"
    },
    image:{
        height: "100%",
        width: "100%",
        resizeMode: 'cover',
        borderRadius: 20
    },
});

