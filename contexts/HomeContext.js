import React from "react";

const HomeContext = React.createContext({
    actions:{
        animateHomeContainerForward: () =>{},
        animateHomeContainerBackward:() =>{},
    },
})

export default HomeContext;
