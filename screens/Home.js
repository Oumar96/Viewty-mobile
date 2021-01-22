
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Animated, TextInput, ImageBackground,TouchableHighlight, TouchableOpacity} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "../firebase/firebase.js";

import HomeContext from "../contexts/HomeContext.js"
import HomePhoneNumberForm from '../components/HomePhoneNumberForm.js';
import HomeCodeConfirmation from '../components/HomeCodeConfirmation.js';

const SCREEN_WIDTH = Dimensions.get('window').width

const Home = () => {
    const homeNumberPhonePosition = useRef(new Animated.Value(SCREEN_WIDTH)).current;
    const [currentContainerPosition, setCurrentContainerPosition] = useState(SCREEN_WIDTH);
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

    const getStarted = () =>{
        setIsShowingGetStartedButton(false);
        animateHomeContainerForward();
    }
    const animateHomeContainerForward = () =>{
        Animated.timing(homeNumberPhonePosition, {
            toValue:currentContainerPosition-SCREEN_WIDTH,
            duration: 500,
            useNativeDriver: true
        }).start();
        setCurrentContainerPosition(currentContainerPosition-SCREEN_WIDTH)
    }
    const animateHomeContainerBackward = () =>{
        Animated.timing(homeNumberPhonePosition, {
            toValue:currentContainerPosition+SCREEN_WIDTH,
            duration: 500,
            useNativeDriver: true
        }).start();
        setCurrentContainerPosition(currentContainerPosition+SCREEN_WIDTH)
    }
    const homePhoneNumberTranslate = {
        transform:[{
            translateX: homeNumberPhonePosition,
        }]
    }

    return (
        <HomeContext.Provider value={{
            actions:{
                animateHomeContainerForward,
                animateHomeContainerBackward,
            }
        }}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/popcorn.jpg')}
            >
                <Animated.View style={[styles.container, homePhoneNumberTranslate]} >
                    <View style={styles.homePhoneNumberFormContainer}>
                        <HomePhoneNumberForm/>
                    </View>
                    <View style={styles.homeCodeConfirmationContainer}>
                        <HomeCodeConfirmation/>
                    </View>
                </Animated.View>
                <View style={styles.footer}>
                    {isShowingGetStartedButton &&
                        <TouchableHighlight style={styles.getStarted} onPress={getStarted}>
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
        </HomeContext.Provider>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: SCREEN_WIDTH*2
    },
    footer:{
        justifyContent:"space-around",
        alignItems: 'center',
        marginBottom:50,
    },
    homePhoneNumberFormContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width:SCREEN_WIDTH
    },
    homeCodeConfirmationContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width:SCREEN_WIDTH
    },
    getStarted:{
        backgroundColor: "#0f9bf2",
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

