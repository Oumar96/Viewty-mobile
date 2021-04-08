import React from "react";

const HomeContext = React.createContext({
  state: {
    userId: "",
  },
});

export default HomeContext;
