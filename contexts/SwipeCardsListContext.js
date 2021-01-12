import React from "react";

const SwipeCardsListContext = React.createContext({
    state:{
        currentMovieIndex:0
    },
    mutations:{
        setCurrentMovieIndex: () =>{}
    }
})

export default SwipeCardsListContext;
