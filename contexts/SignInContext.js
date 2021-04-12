import React from "react";

const SignInContext = React.createContext({
  state: {
    phoneNumberVerificationId: "",
  },
  mutations: {
    setPhoneNumberVerificationId: () => {},
  },
  actions: {
    animateSignInContainerForward: () => {},
    animateSignInContainerBackward: () => {},
    navigateToRooms: () => {},
  },
});

export default SignInContext;
