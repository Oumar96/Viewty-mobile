import React from "react";

const RoomsContext = React.createContext({
  state: {
    userId: "",
    rooms: [],
    moviesDetails: [],
    navigation: {},
  },
});

export default RoomsContext;
