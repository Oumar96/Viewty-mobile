import React, { useContext}from 'react';

import {View} from 'react-native';
import SwipeCardsListContext from "../contexts/SwipeCardsListContext.js";

import SwipeCard from "./SwipeCard.js";

const SwipeCardsList = () =>{
    const swipeCardsListContext = useContext(SwipeCardsListContext);
    let currentMovieIndex = swipeCardsListContext.state.currentMovieIndex;
    let movies = swipeCardsListContext.state.movies;

    const getSwipeCardType = (index) =>{
        return index === currentMovieIndex ? "top-card": 'bottom-card';
    }

    const renderMovies = () =>{
        return movies.map((movie, index) =>{
            if (index < currentMovieIndex) {
                return null
            } else{
                return <SwipeCard key={movie.id} type={getSwipeCardType(index)} movie={movie}/>
            }
        }).reverse();
    }

    return (
            <View style={{ flex: 1 }}>
                {renderMovies()}
            </View>
    )
}

export default SwipeCardsList;