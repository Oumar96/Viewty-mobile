import React, { useRef, useState, useContext } from 'react';
import {StyleSheet, Dimensions, TouchableHighlight, View, Text} from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import HomeContext from "../contexts/HomeContext.js";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "../firebase/firebase.js";



const HomePhoneNumberForm = () =>{
    const homeContext = useContext(HomeContext);
    const [sendCodeTextColor, setSendCodeTextColor] = useState({color:'#0f9bf2'});
    const [phoneNumber, setPhoneNumber] = useState('');
    const recaptchaVerifier = useRef(null);

    const sendVerification = async () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const responseVerifcationID = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
        homeContext.mutations.setPhoneNumberVerificationId(responseVerifcationID);
    }

    const sendCode = async () =>{
        try{
            await sendVerification();
            homeContext.actions.animateHomeContainerForward();
        } catch(e){
            // handle error
        }
    }

    
    return(
        <View styles={styles.phoneNumberForm}>
            <PhoneInput
                onChangeFormattedText={setPhoneNumber}
                defaultCode="US"
                containerStyle={styles.containerStyle}
                textContainerStyle={styles.textContainerStyle}
            />
            <View style={styles.sendCodeButtonContainer}>
                <TouchableHighlight
                    style={styles.sendCodeButton}
                    underlayColor="#0f9bf2"
                    onShowUnderlay={() => {setSendCodeTextColor({color:'white'})}}
                    onHideUnderlay={() => {setSendCodeTextColor({color:'#0f9bf2'})}}
                    onPress={sendCode}
                >
                    <Text style={[styles.sendCodeText, sendCodeTextColor]}> Send Code </Text>
                </TouchableHighlight>
            </View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
        </View>
    )
}

export default HomePhoneNumberForm;

const styles = StyleSheet.create({
    phoneNumberForm:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    containerStyle:{
        borderRadius: 10,
        elevation: 7,
        shadowRadius: 3,
        shadowOpacity: 0.1,
        width: 350,
    },
    textContainerStyle:{
        borderTopRightRadius: 10,
        borderBottomRightRadius:10,
    },
    sendCodeButtonContainer:{
        alignItems: 'center',
        marginTop: 50
    },
    sendCodeButton:{
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: "white",
        borderRadius:50,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 3,
        shadowOpacity: 0.15,
        borderWidth:1,
        borderColor:'#0f9bf2',
    },
    sendCodeText:{
        fontSize: 16,
        fontWeight: "800",
        color: "#0f9bf2"
    }
});
