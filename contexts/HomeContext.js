import React from "react";

const HomeContext = React.createContext({
  state: {
    userId: "",
    navigation: {},
  },
});

export default HomeContext;
