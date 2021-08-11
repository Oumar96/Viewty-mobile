import React from "react";

const UserContext = React.createContext({
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser: () => {},
  },
});

export default UserContext;
