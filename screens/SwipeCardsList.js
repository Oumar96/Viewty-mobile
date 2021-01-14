import React, { useEffect, useState }from 'react';

import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import SwipeCardsListContext from "../contexts/SwipeCardsListContext.js";

import SwipeCard from "../components/SwipeCard.js";


const Movies = [
    { id: "1", uri: require('../assets/1.jpg') },
    { id: "2", uri: require('../assets/2.jpg') },
    { id: "3", uri: require('../assets/3.jpg') },
    { id: "4", uri: require('../assets/4.jpg') },
    { id: "5", uri: require('../assets/5.jpg') },
]


const SwipeCardsList = () =>{
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [topCardPosition, setTopCardPosition] = useState(new Animated.ValueXY());


    const getSwipeCardType = (index) =>{
        return index === currentMovieIndex ? "top-card": 'bottom-card';
    }

    const renderMovies = () =>{
        return Movies.map((movie, index) =>{
            if (index < currentMovieIndex) {
                return null
            } else{
                return <SwipeCard key={movie.id} type={getSwipeCardType(index)} movie={movie}/>
            }
        }).reverse();
    }

    return (
        <SwipeCardsListContext.Provider value={{
            state:{
                currentMovieIndex,
                topCardPosition
            },
            mutations:{
                setCurrentMovieIndex:(index) =>setCurrentMovieIndex(index),
                setTopCardPosition:(position) => setTopCardPosition(position)
            }
        }}>
        <View style={{ flex: 1 }}>
            <View style={{ height: 60 }}>
                </View>
                    <View style={{ flex: 1 }}>
                        {renderMovies()}
                    </View>
                <View style={{ height: 60 }}>
            </View>
        </View>
        </SwipeCardsListContext.Provider>
    )
}

export default SwipeCardsList;