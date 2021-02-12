import React ,{useState, useEffect } from 'react';

import {View, Animated} from 'react-native';
import firebase from "../firebase/firebase.js";
import {isNil, isEmpty} from "lodash";

import MoviesApi from "../api/Movies.js";

import MoviesContext from "../contexts/MoviesContext.js";
import SwipeCardsList from "../components/SwipeCardsList.js";
import ErrorModal from "../components/ErrorModal.js";
import Match from "../components/Match.js";

const USER_ID = "5145753393";
const ROOM_ID = "a9ee2bb6-66d7-4e1f-a282-3ecbc01cb707";

const Movies = () =>{
    /***********
     * State
     ***********/
    const [movies, setMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(USER_ID);
    const [currentRoomId, setCurrentRoomId] = useState(ROOM_ID);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [topCardPosition, setTopCardPosition] = useState(new Animated.ValueXY());
    const [isShowErrorModal, setIsShowErrorModal] = useState(false);

    /***********
     * Methods
     ***********/

    /**
     *
     * @param {String} name
     * @param {Object} payload
     * @param {String} payload.user
     * @param {String} payload.room
     * @param {String} payload.vote
     * @returns {Promise}
     */
    const vote = async (name, payload) =>{
        try{
            let response = await MoviesApi.vote(name, payload);
            return Promise.resolve(response)
        }
        catch(error){
            return Promise.reject(error)
        }
    }

    useEffect(() => {
        const moviesRef = firebase.database().ref(`rooms/${ROOM_ID}/movies`);
        moviesRef.on('value', (snapshot) => {
            let roomMovies = snapshot.val();
            let moviesTemp = [];
            for (let newMovie in roomMovies){
                if(isNil(roomMovies[newMovie][USER_ID])){
                    moviesTemp.push({
                        name:newMovie,
                        ...roomMovies[newMovie]
                    })
                }
            }
            setInitialMovies(moviesTemp)
        });
        moviesRef.on('child_changed', (snapshot) =>{
            console.log("child_changed", snapshot)
        })
    }, []);

    useEffect(() =>{
        let currentMovies = [...movies];
        const moviesRef = firebase.database().ref(`rooms/${ROOM_ID}/movies`);
        moviesRef.on("child_added", (snapshot) =>{
            let newMovie = {
                name:snapshot.key,
                ...snapshot.val()
            }
            let isMovieInCurrentMovies = currentMovies.some(movie => movie.name === newMovie.name);
            if(!isMovieInCurrentMovies && !isEmpty(initialMovies) && isNil(newMovie[USER_ID])){
                currentMovies.push(newMovie)
            }
        })
        setMovies(currentMovies)
    }, [initialMovies])

    return(
        <MoviesContext.Provider value={{
            state:{
                currentUserId,
                currentRoomId,
                movies,
                currentMovieIndex,
                topCardPosition,
            },
            mutations:{
                setCurrentMovieIndex:(index) =>setCurrentMovieIndex(index),
                setTopCardPosition:(position) => setTopCardPosition(position),
            },
            actions:{
                vote,
                showErrorModal: () => setIsShowErrorModal(true)
            }
        }}>
        <View style={{ flex: 1 }}>
            <View style={{ height: 60 }}>
            </View>
            <SwipeCardsList/>
            <View style={{ height: 60 }}>
            </View>
        </View>
        <Match/>
        <ErrorModal
            isVisible={isShowErrorModal}
            hide={() =>setIsShowErrorModal(false)}
        />
        </MoviesContext.Provider>
    )
}

export default Movies;
