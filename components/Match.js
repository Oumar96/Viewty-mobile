import React from "react";
import {StyleSheet, Text, Dimensions, TouchableHighlight, View } from "react-native";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Match = () =>{
    return (
        <View style={styles.container}>
            <View style={styles.newMatch}>
                <Text style={styles.newMatchText}>New Match!</Text>
            </View>
            <View style={styles.movieMatched}>
                <View>
                    <Text>You both liked</Text>
                </View>
                <View>
                    <Text>Movie</Text>
                </View>
                <View>
                    <Text>Image</Text>
                </View>
            </View>
            <View style={styles.choiceButtons}>
                <View>
                    <Text>End</Text>
                </View>
                <View>
                    <Text>Continue Swipping</Text>
                </View>
            </View>
        </View>
    )
}

export default Match;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgba(0, 0, 0, 0.8)",
        position:'absolute',
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,
        paddingTop:70,
        paddingBottom:70,
        paddingLeft:40,
        paddingRight:40,
        zIndex:1000,
    },
    newMatch:{
        flex:2,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    newMatchText:{
        color:'white',
        fontSize:30,
        fontFamily: 'Pacifico_400Regular',
    },
    movieMatched:{
        flex:4,
        backgroundColor:'red',
        width:'100%'
    },
    choiceButtons:{
        flex:3,
        backgroundColor:'green',
        width:'100%'
    }
})