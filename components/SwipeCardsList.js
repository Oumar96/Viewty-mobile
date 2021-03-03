import React, { useContext } from "react";

import { View } from "react-native";
import MoviesContext from "../contexts/MoviesContext.js";

import SwipeCard from "./SwipeCard.js";

const SwipeCardsList = () => {
  const moviesContext = useContext(MoviesContext);
  let currentMovieIndex = moviesContext.state.currentMovieIndex;
  let movies = moviesContext.state.movies;

  const getSwipeCardType = (index) => {
    return index === currentMovieIndex ? "top-card" : "bottom-card";
  };

  const renderMovies = () => {
    return movies
      .map((movie, index) => {
        if (index < currentMovieIndex) {
          return null;
        } else {
          return (
            <SwipeCard
              key={index}
              type={getSwipeCardType(index)}
              movie={movie}
            />
          );
        }
      })
      .reverse();
  };

  return <View style={{ flex: 1 }}>{renderMovies()}</View>;
};

export default SwipeCardsList;
