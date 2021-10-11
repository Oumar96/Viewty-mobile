import React from "react";

const MoviesContext = React.createContext({
  state: {
    currentRoomId: "",
    currentMovieIndex: 0,
    topCardPosition: null,
    matchedMovie: null,
  },
  mutations: {
    setCurrentMovieIndex: () => {},
    setTopCardPosition: () => {},
    setMatchedMovie: () => {},
  },
  actions: {
    vote: () => {},
    endRoom: () => {},
    showErrorModal: () => {},
  },
});

export default MoviesContext;
