import React ,{useState, useEffect } from 'react';

import {View,Animated} from 'react-native';
import firebase from "../firebase/firebase.js";
import {isNil} from "lodash";

import MoviesApi from "../api/Movies.js";

import MoviesContext from "../contexts/MoviesContext.js";
import SwipeCardsList from "../components/SwipeCardsList.js";

const USER_ID = "5145753393";
const ROOM_ID = "a9ee2bb6-66d7-4e1f-a282-3ecbc01cb707";

const Movies = () =>{
    /***********
     * State
     ***********/
    const [movies, setMovies] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(USER_ID);
    const [currentRoomId, setCurrentRoomId] = useState(ROOM_ID);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [topCardPosition, setTopCardPosition] = useState(new Animated.ValueXY());

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
        const roomsRef = firebase.database().ref('rooms');
        roomsRef.on('value', (snapshot) => {
            let currentRoom = snapshot.child(ROOM_ID)
            let roomMovies = currentRoom.child("movies").val();
            let movies = [];
            for (let movie in roomMovies){
                if(isNil(roomMovies[movie][USER_ID])){
                    movies.push({
                        name:movie,
                        ...roomMovies[movie]
                    })
                }
            }
            setMovies(movies)
        });
    }, []);

    return(
        <MoviesContext.Provider value={{
            state:{
                currentUserId,
                currentRoomId,
                movies,
                currentMovieIndex,
                topCardPosition
            },
            mutations:{
                setCurrentMovieIndex:(index) =>setCurrentMovieIndex(index),
                setTopCardPosition:(position) => setTopCardPosition(position)
            },
            actions:{
                vote
            }
        }}>
        <View style={{ flex: 1 }}>
            <View style={{ height: 60 }}>
            </View>
            <SwipeCardsList/>
            <View style={{ height: 60 }}>
            </View>
        </View>
        </MoviesContext.Provider>
    )
}

export default Movies;
