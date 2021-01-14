import React, { useEffect, useState, useContext }from 'react';

import { Text, Dimensions, Image, Animated, PanResponder } from 'react-native';
import SwipeCardsListContext from "../contexts/SwipeCardsListContext.js";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const SwipeCard = (props) =>{
    const {
        type = "top-card",
        movie = {},
    } = props;

    const swipeCardsListContext = useContext(SwipeCardsListContext);
    const [panHandlers, setPanHandlers] = useState(null);

    let position = swipeCardsListContext.state.topCardPosition

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
        {
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: 'absolute'
        }
    ]
    const bottomCardStyle = [
        {
            opacity: nextCardOpacity,
            transform: [
                {
                    scale: nextCardScale
                }
            ],
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: 'absolute'
        }
    ]
    const incrementMovieIndex = () =>{
        let newMovieIndex = swipeCardsListContext.state.currentMovieIndex+1;
        swipeCardsListContext.mutations.setCurrentMovieIndex(newMovieIndex);
    }
    const removeCard = () =>{
        let newPosition = position;
        newPosition.setValue({ x: 0, y: 0 })
        swipeCardsListContext.mutations.setTopCardPosition(newPosition)
    }
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
    const getPanResponder = () =>{
            return PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onPanResponderMove: (evt, gestureState) => {
                let newPosition = position;
                newPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
                swipeCardsListContext.mutations.setTopCardPosition(newPosition)
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
    }, [swipeCardsListContext.state.currentMovieIndex]);

    return (
        <Animated.View
            {...getComponentProps[type]["card-props"]}
        >
            <Animated.View style={{ opacity: getComponentProps[type]["like-opacity"], transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: getComponentProps[type]["dislike-opacity"], transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={movie.uri} />
        </Animated.View>
    )
}

export default SwipeCard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });