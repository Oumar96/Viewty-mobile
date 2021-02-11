import React from "react";

const HomeContext = React.createContext({
    state:{
        phoneNumberVerificationId:'',
        isSignedIn: false,
    },
    mutations:{
        setPhoneNumberVerificationId: () =>{},
        setIsSignedIn: () =>{},
    },
    actions:{
        animateHomeContainerForward: () =>{},
        animateHomeContainerBackward:() =>{},
    },
})

export default HomeContext;
