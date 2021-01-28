import React from "react";

const HomeContext = React.createContext({
    state:{
        phoneNumberVerificationId:'',
    },
    mutations:{
        setPhoneNumberVerificationId: () =>{},
    },
    actions:{
        animateHomeContainerForward: () =>{},
        animateHomeContainerBackward:() =>{},
    },
})

export default HomeContext;
