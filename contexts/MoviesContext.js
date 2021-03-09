import React from "react";

const MoviesContext = React.createContext({
  state: {
    currentUserId: "",
    currentRoomId: "",
    movies: [],
    currentMovieIndex: 0,
    topCardPosition: null,
    matchedMovie: [],
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
