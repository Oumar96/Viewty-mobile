import React from "react";

const MoviesContext = React.createContext({
    state:{
        currentUserId:"",
        currentRoomId:"",
        movies:[],
        currentMovieIndex:0,
        topCardPosition:null,
        isShowingMatch:false
    },
    mutations:{
        setCurrentMovieIndex: () =>{},
        setTopCardPosition:()=>{},
        setIsShowingMatch:() =>{}
    },
    actions:{
        vote:() =>{},
        endRoom:() => {},
        showErrorModal:() =>{}
    }
})

export default MoviesContext;
