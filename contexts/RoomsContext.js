import React from "react";

const RoomsContext = React.createContext({
  state: {
    userId: "",
    rooms: [],
    moviesDetails: [],
  },
});

export default RoomsContext;
