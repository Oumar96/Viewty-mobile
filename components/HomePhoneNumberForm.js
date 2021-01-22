import React, { useEffect, useState, useContext } from 'react';
import {StyleSheet, Dimensions, TouchableHighlight, View, Text} from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import HomeContext from "../contexts/HomeContext.js"



const HomePhoneNumberForm = () =>{
    const homeContext = useContext(HomeContext);
    return(
        <View styles={styles.phoneNumberForm}>
            <PhoneInput
                defaultCode="US"
                containerStyle={styles.containerStyle}
                textContainerStyle={styles.textContainerStyle}
            />
            <View style={styles.sendCodeButtonContainer}>
                <TouchableHighlight style={styles.sendCodeButton} underlayColor="#8dc3f0" onPress={homeContext.actions.animateHomeContainerForward}>
                    <Text style={styles.sendCodeText}> Send Code </Text>
                </TouchableHighlight>
            </View>
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
        height:50,
        width: 350
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
        width: "80%",
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: "#0f9bf2",
        borderRadius:10,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 3,
        shadowOpacity: 0.15
    },
    sendCodeText:{
        fontSize: 16,
        fontWeight: "800",
        color: "white"
    }
});
