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
    const moviesRef = firebase.database().ref(`rooms/${ROOM_ID}/movies`);

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
    const [matchedMovie, setMatchedMovie] = useState(null);
    const [matchedMovieName, setMatchedMovieName] = useState('');

    /***********
     * Methods
     ***********/

    /**
     * 
     * @param {Object} movies
     * @returns {String}
     */
    const getMoviesNames = (movies) =>{
        return Object.keys(movies).join()
    }

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
            return Promise.resolve(response.data)
        }catch(error){
            return Promise.reject(error)
        }
    }

    const getMoviesDetails = async (movieNames)=>{
        try{
            let response = await MoviesApi.getMoviesDetails(movieNames);
            return Promise.resolve(response.data)
        } catch(error){
            return Promise.reject(error)
        }
    }

    /**
     *
     * @returns {Promise}
     */
    const endRoom = async () =>{
        try{
            let response = await MoviesApi.endRoom();
            return Promise.resolve(response.data)
        } catch(error){
            return Promise.reject(error)
        }
    }

    useEffect(() => {
        moviesRef.on('value', async (snapshot) => {
            let roomMovies = snapshot.val();
            let moviesTemp = [];
            let moviesNames = getMoviesNames(roomMovies);
            let moviesDetails = await getMoviesDetails({names:moviesNames});
            for (let movie in roomMovies){
                if(isNil(roomMovies[movie][USER_ID])){
                    let movieDetails = !isNil(moviesDetails[movie]) ? moviesDetails[movie] : null;
                    movieDetails.name = movieDetails.name.toLowerCase();
                    moviesTemp.push({
                        name:movie,
                        ...roomMovies[movie],
                        ...movieDetails
                    })
                }
            }
            setInitialMovies(moviesTemp)
        });
        moviesRef.on('child_changed', (snapshot) =>{
            if(snapshot.val().likes === 2){
                setMatchedMovieName(snapshot.key.toLowerCase());
            }
        })
    }, []);

    useEffect(() =>{
        let matchedMovie = movies.find(movie => movie.name.toLowerCase() === matchedMovieName);
        setMatchedMovie(matchedMovie)
    }, [matchedMovieName])

    useEffect(() =>{
        let currentMovies = !isEmpty(movies)? [...movies] : [...initialMovies];
        moviesRef.on("child_added", async (snapshot) =>{
            let newMovie = {
                name:snapshot.key,
                ...snapshot.val()
            }
            let isMovieInCurrentMovies = currentMovies.some(movie => movie.name.toLowerCase() === newMovie.name.toLowerCase());
            if(!isMovieInCurrentMovies && !isEmpty(initialMovies) && isNil(newMovie[USER_ID])){
                let moviesDetails = await getMoviesDetails({names:snapshot.key});
                let details = moviesDetails[snapshot.key]
                details.name = details.name.toLowerCase();
                let movie = {
                    ...newMovie,
                    ...details
                }
                currentMovies.push(movie)
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
                matchedMovie
            },
            mutations:{
                setCurrentMovieIndex:(index) =>setCurrentMovieIndex(index),
                setTopCardPosition:(position) => setTopCardPosition(position),
                setMatchedMovie
            },
            actions:{
                vote,
                endRoom,
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
        {!isNil(matchedMovie) && <Match/>}
        <ErrorModal
            isVisible={isShowErrorModal}
            hide={() =>setIsShowErrorModal(false)}
        />
        </MoviesContext.Provider>
    )
}

export default Movies;
