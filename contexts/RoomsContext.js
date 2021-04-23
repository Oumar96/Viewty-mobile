import React from "react";

const RoomsContext = React.createContext({
  state: {
    userId: "",
    rooms: [],
    moviesDetails: [],
    navigation: null,
  },
});

export default RoomsContext;
