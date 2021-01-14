import React from "react";

const SwipeCardsListContext = React.createContext({
    state:{
        movies:[],
        currentMovieIndex:0,
        topCardPosition:null,
    },
    mutations:{
        setCurrentMovieIndex: () =>{},
        setTopCardPosition:()=>{}
    }
})

export default SwipeCardsListContext;
