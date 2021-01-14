import React from "react";

const SwipeCardsListContext = React.createContext({
    state:{
        currentMovieIndex:0,
        topCardPosition:null,
    },
    mutations:{
        setCurrentMovieIndex: () =>{},
        setTopCardPosition:()=>{}
    }
})

export default SwipeCardsListContext;
