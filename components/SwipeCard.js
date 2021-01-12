import React, { useEffect, useState }from 'react';

import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import {isEmpty} from "lodash";
import SwipeCardsListContext from "../contexts/SwipeCardsListContext.js";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width



const SwipeCard = (props) =>{
    const {
        type = "top-card"
    } = props;

    let position = new Animated.ValueXY();
    let PanResponder = null;

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
        "top-card":getTopCardStyle,
        "bottom-card":getBottomCardStyle
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
        return {
            opacity: dislikeOpacity,
            transform: [
                {
                    rotate: '30deg'
                }
            ],
            position: 'absolute',
            top: 50,
            right: 40,
            zIndex: 1000
        }
    }
    const getPanHandlers = () =>{
        return !isEmpty(PanResponder) ? PanResponder.panHandlers : {};
    }
    const initializePanResponder = () =>{
        PanResponder = PanResponder.create({
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
                  this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                    position.setValue({ x: 0, y: 0 })
                  })
                })
              }
              else if (gestureState.dx < -120) {
                Animated.spring(position, {
                  toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                  useNativeDriver: true
                }).start(() => {
                  this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                    position.setValue({ x: 0, y: 0 })
                  })
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
        initializePanResponder();
    }, []);

    return (
        <Animated.View
            {...getPanHandlers}
            key={item.id} style={getStyleStrategy[props.type]()}>
            <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={item.uri} />
        </Animated.View>
    )

}

export default SwipeCard;