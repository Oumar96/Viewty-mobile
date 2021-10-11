import React, { useContext } from "react";

import { View } from "react-native";
import MoviesContext from "../contexts/MoviesContext.js";

import SwipeCard from "./SwipeCard.js";

const SwipeCardsList = (props) => {
  /***********
   * Props
   ***********/
  const { movies = [] } = props;

  const moviesContext = useContext(MoviesContext);
  /***********
   * Context State
   ***********/
  let currentMovieIndex = moviesContext.state.currentMovieIndex;

  /***********
   * Methods
   ***********/

  /**
   *
   * @param {Number} index
   * @returns {Boolean}
   */
  const getSwipeCardType = (index) => {
    return index === currentMovieIndex ? "top-card" : "bottom-card";
  };
  /**
   *
   * @returns {JSX}
   */
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
