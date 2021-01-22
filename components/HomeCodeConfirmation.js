import React, { useEffect, useState, useContext } from 'react';
import {StyleSheet, TextInput, Dimensions, TouchableHighlight, View, Text} from 'react-native';
import HomeContext from "../contexts/HomeContext.js"


const HomeCodeConfirmation = () =>{
    const homeContext = useContext(HomeContext);
    return(
        <View styles={styles.codeConfirmation}>
            <TextInput
                placeholder="Code"
                style={styles.confirmationCodeInput}
            />
            <View style={styles.confirmCodedButtonContainer}>
                <TouchableHighlight style={styles.confirmCodeButton}>
                    <Text style={styles.confirmCodeText}> Confirm Code </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.cancelButton} onPress={homeContext.actions.animateHomeContainerBackward}>
                    <Text style={styles.cancelCodeText}> Cancel </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default HomeCodeConfirmation;

const styles = StyleSheet.create({
    codeConfirmation:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    confirmationCodeInput:{
        borderRadius: 10,
        elevation: 7,
        shadowRadius: 3,
        shadowOpacity: 0.1,
        width: 200,
        height:50,
        borderWidth:1,
        borderColor:'#cdcccf',
        backgroundColor:'white',
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: "bold",
    },
    confirmCodedButtonContainer:{
        alignItems: 'center',
        marginTop: 50
    },
    confirmCodeButton:{
        width: 300,
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
    cancelButton:{
        width: 300,
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: "white",
        borderRadius:10,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 3,
        shadowOpacity: 0.15
    },
    confirmCodeText:{
        fontSize: 16,
        fontWeight: "800",
        color: "white"
    },
    cancelCodeText:{
        fontSize: 16,
        fontWeight: "800",
        color: "gray"
    }
});
