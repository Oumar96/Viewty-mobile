import React from "react";

const MoviesContext = React.createContext({
    state:{
        currentUserId:"",
        currentRoomId:"",
        movies:[],
        currentMovieIndex:0,
        topCardPosition:null,
    },
    mutations:{
        setCurrentMovieIndex: () =>{},
        setTopCardPosition:()=>{},
    },
    actions:{
        vote:() =>{},
        showErrorModal:() =>{}
    }
})

export default MoviesContext;
