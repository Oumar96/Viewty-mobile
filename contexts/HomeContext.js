import React from "react";

const HomeContext = React.createContext({
  state: {
    userId: "",
    navigation: null,
  },
});

export default HomeContext;
