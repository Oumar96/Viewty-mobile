import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, Image, TouchableHighlight, View } from "react-native";
import {isEmpty} from "lodash";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 *
 * @param {String} image
 * @returns {uri}
 */
const getMovieImageInitialState = (image) =>{
    return isEmpty(image) ?
        require('../assets/1.jpg') :
        {uri:image};
}
const Match = (props) =>{
    const {
        name="Batman",
        image="https://i.pinimg.com/originals/f8/4c/75/f84c755544f81ec1bcd2d6396112566b.png"
    } = props;

    /***********
     * State
     ***********/
    const [movieImage, setMovieImage] = useState(getMovieImageInitialState(image));

    /***********
     * Methods
     ***********/

    const setMovieImageToDefault = () =>{
        setMovieImage(require('../assets/1.jpg'));
    }
    return (
        <View style={styles.container}>
            <View style={styles.newMatch}>
                <Text style={styles.newMatchText}>New Match!</Text>
            </View>
            <View style={styles.movieMatched}>
                <View>
                    <Text style={styles.bothLikeText}>You and your guest both liked</Text>
                </View>
                <View>
                    <Text style={styles.movieNameText}>{name}</Text>
                </View>
                <View>
                    <Image
                        style={styles.movieImage}
                        source={movieImage}
                        onError={setMovieImageToDefault}
                    />
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
        fontSize:35,
        fontFamily: 'Pacifico_400Regular',
    },
    movieMatched:{
        flex:4,
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
    },
    choiceButtons:{
        flex:5,
        backgroundColor:'green',
        width:'100%'
    },
    movieImage:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1,
        borderColor:'white'
    },
    bothLikeText:{
        fontSize:22,
        color:'white'
    },
    movieNameText:{
        fontSize:35,
        fontWeight:'bold',
        color:'white'
    }
})