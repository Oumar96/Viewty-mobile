import React from "react";

const RoomsContext = React.createContext({
  state: {
    rooms: [],
  },
});

export default RoomsContext;
