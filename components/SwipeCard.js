import React, { useEffect, useState, useContext }from 'react';

import { StyleSheet, View, Text, Dimensions, Image, Animated, PanResponder } from 'react-native';
import MoviesContext from "../contexts/MoviesContext.js";
import {isEmpty, upperCase} from "lodash";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const getMovieImageInitialState = (image) =>{
    return isEmpty(image) ?
        require('../assets/1.jpg') :
        {uri:image};
}

const SwipeCard = (props) =>{
    const {
        type = "top-card",
        movie = {},
    } = props;

    const moviesContext = useContext(MoviesContext);
    const [panHandlers, setPanHandlers] = useState(null);
    const [movieImage, setMovieImage] = useState(getMovieImageInitialState(movie.image));

    let position = moviesContext.state.topCardPosition

    let rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    let rotateAndTranslate = {
        transform: [{
            rotate
        },
        ...position.getTranslateTransform()
    ]
    }
    let likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })
    let dislikeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
    })

    let nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
    })
    let nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
    })
    const topCardStyle = [
        rotateAndTranslate,
        styles.topCard
    ]
    const bottomCardStyle = [
        {
            opacity: nextCardOpacity,
            transform: [
                {
                    scale: nextCardScale
                }
            ]
        },
        styles.bottomCard
    ]
    const getComponentProps = {
        "top-card": {
            "card-props":{
                ...panHandlers,
                key:movie.id,
                style:topCardStyle
            },
            "like-opacity":likeOpacity,
            "dislike-opacity": dislikeOpacity
        },
        "bottom-card":{
            "card-props":{
                key:movie.id,
                style:bottomCardStyle
            },
            "like-opacity":0,
            "dislike-opacity": 0
        }
    }

    const incrementMovieIndex = () =>{
        let newMovieIndex = moviesContext.state.currentMovieIndex+1;
        moviesContext.mutations.setCurrentMovieIndex(newMovieIndex);
    }
    const removeCard = () =>{
        let newPosition = position;
        newPosition.setValue({ x: 0, y: 0 })
        moviesContext.mutations.setTopCardPosition(newPosition)
    }
    const setMovieImageToDefault = () =>{
        setMovieImage(require('../assets/1.jpg'));
    }
    const getPanResponder = () =>{
            return PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onPanResponderMove: (evt, gestureState) => {
                let newPosition = position;
                newPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
                moviesContext.mutations.setTopCardPosition(newPosition)
                },
                onPanResponderRelease: (evt, gestureState) => {

                if (gestureState.dx > 120) {
                    Animated.spring(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                    useNativeDriver: true
                    }).start(() => {
                        incrementMovieIndex();
                        removeCard();
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    useNativeDriver: true
                    }).start(() => {
                        incrementMovieIndex();
                        removeCard();
                    })
                }
                else {
                    Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    friction: 4,
                    useNativeDriver: true
                    }).start()
                }
                }
            })
    }

    useEffect( () => {
        let panResponder = getPanResponder();
        setPanHandlers(panResponder.panHandlers);
    }, [moviesContext.state.currentMovieIndex]);

    return (
        <Animated.View
            {...getComponentProps[type]["card-props"]}
        >
            <Animated.View
                style={[{ opacity: getComponentProps[type]["like-opacity"]}, styles.like] }
            >
                <Text style={styles.likeText}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[{ opacity: getComponentProps[type]["dislike-opacity"]}, styles.nope]}>
                <Text style={styles.nopeText}>NOPE</Text>
            </Animated.View>
            <View style={styles.movieName}>
                <Text style={styles.movieNameText}>{upperCase(movie.name)}</Text>
            </View>
            <Image
                style={styles.image}
                source={movieImage}
                onError={setMovieImageToDefault} />
        </Animated.View>
    )
}

export default SwipeCard;

const styles = StyleSheet.create({
    topCard:{
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        padding: 10,
        position: 'absolute'
    },
    bottomCard:{
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        padding: 10,
        position: 'absolute'
    },
    like:{
        transform: [{ rotate: '-30deg' }],
        position: 'absolute',
        top: 50,
        left: 40,
        zIndex: 1000
    },
    likeText:{
        borderWidth: 1,
        borderColor: 'green',
        color: 'green',
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    },
    nope:{
        transform: [{ rotate: '30deg' }],
        position: 'absolute',
        top: 50,
        right: 40,
        zIndex: 1000
    },
    nopeText:{
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    },
    movieName:{
        position: 'absolute',
        bottom: 60,
        left:30,
        right:30,
        alignItems:'center',
        width:SCREEN_WIDTH-60,
        zIndex: 1000
    },
    movieNameText:{
        fontSize: 40,
        color: 'white',
        fontWeight: "bold",
    },
    image:{
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
        borderRadius: 20
    }
});