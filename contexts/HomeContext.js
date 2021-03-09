import React from "react";

const HomeContext = React.createContext({
  state: {
    phoneNumberVerificationId: "",
  },
  mutations: {
    setPhoneNumberVerificationId: () => {},
  },
  actions: {
    animateHomeContainerForward: () => {},
    animateHomeContainerBackward: () => {},
    navigateToRooms: () => {},
  },
});

export default HomeContext;
