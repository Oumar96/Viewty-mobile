import React from "react";

const MoviesContext = React.createContext({
  state: {
    movies: [],
    currentMovieIndex: 0,
    topCardPosition: null,
  },
  mutations: {
    setCurrentMovieIndex: () => {},
    setTopCardPosition: () => {},
  },
});

export default MoviesContext;
