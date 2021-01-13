import React, { useEffect, useState, useContext }from 'react';

import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
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

    let position = new Animated.ValueXY();

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

    const getStyleStrategy = {
        "top-card":() => getTopCardStyle(),
        "bottom-card":() =>getBottomCardStyle(),
    }
    const getTopCardStyle = () =>{
        return [
            rotateAndTranslate,
            {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute'
            }
        ]
    }
    const getBottomCardStyle = () =>{
        return [
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
    }
    const incrementMovieIndex = () =>{
        let currentMovieIndex = swipeCardsListContext.state.currentMovieIndex;
        swipeCardsListContext.mutations.setCurrentMovieIndex(currentMovieIndex);
    }
    const getPanHandlers = () =>{
        return type === "top-card" ? panHandlers : {};
    }
    const getPanResponder = () =>{
            return PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onPanResponderMove: (evt, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy })
                },
                onPanResponderRelease: (evt, gestureState) => {

                if (gestureState.dx > 120) {
                    Animated.spring(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                    useNativeDriver: true
                    }).start(() => {
                        incrementMovieIndex();
                        position.setValue({ x: 0, y: 0 })
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    useNativeDriver: true
                    }).start(() => {
                        incrementMovieIndex();
                        position.setValue({ x: 0, y: 0 })
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
    }, []);

    return (
        <Animated.View
            {...getPanHandlers()}
            key={movie.id} style={getStyleStrategy[type]()}>
            <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={movie.uri} />
        </Animated.View>
    )
}

export default SwipeCard;