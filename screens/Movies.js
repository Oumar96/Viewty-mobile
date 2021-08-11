import React, { useState, useEffect, useContext } from "react";

import { View, Animated, StyleSheet } from "react-native";
import firebase from "../firebase/firebase.js";
import { isNil, isEmpty } from "lodash";

import Movie from "../classes/Movie.js";

import MoviesApi from "../api/Movies.js";

import MoviesContext from "../contexts/MoviesContext.js";
import SwipeCardsList from "../components/SwipeCardsList.js";
import BaseModal from "../components/BaseModal.js";
import Match from "../components/Match.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

const USER_ID = "5145753393";
const ROOM_ID = "a9ee2bb6-66d7-4e1f-a282-3ecbc01cb707";

const Movies = ({ route }) => {
  const currentUserContext = useContext(CurrentUserContext);
  /***********
   * Context State
   ***********/
  const currentUser = currentUserContext.state.currentUser;

  /***********
   * State
   ***********/
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(USER_ID);
  const [currentRoomId, setCurrentRoomId] = useState(ROOM_ID);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [topCardPosition, setTopCardPosition] = useState(
    new Animated.ValueXY()
  );
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);
  const [matchedMovie, setMatchedMovie] = useState(null);
  const [matchedMovieName, setMatchedMovieName] = useState("");

  /***********
   * Data
   ***********/
  const userId = route.params.userId;
  const roomId = route.params.roomId;
  const moviesRef = firebase.database().ref(`rooms/${roomId}/movies`);
  const errorModalText =
    "An error occured! Please try again. If the error persists contact support.";

  /***********
   * Methods
   ***********/

  /**
   *
   * @param {Object} movies
   * @returns {String}
   */
  const getConcatenatedMovieName = (movies) => {
    return Object.keys(movies).join();
  };

  /**
   *
   * @param {String} name
   * @param {Object} payload
   * @param {String} payload.user
   * @param {String} payload.room
   * @param {String} payload.vote
   * @returns {Promise}
   */
  const vote = async (name, payload) => {
    try {
      let response = await MoviesApi.vote(name, payload);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   *
   * @param {String} movieNames
   * @returns {Promise}
   */
  const getMoviesDetails = async (movieNames) => {
    try {
      let response = await MoviesApi.getMoviesDetails(movieNames);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   *
   * @returns {Promise}
   */
  const endRoom = async () => {
    try {
      let response = await MoviesApi.endRoom();
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    moviesRef.on("value", async (snapshot) => {
      let roomMovies = snapshot.val();
      let movies = [];
      let moviesDetails = await getMoviesDetails({
        names: getConcatenatedMovieName(roomMovies),
      });
      for (let roomMovie in roomMovies) {
        const isCurrentUserVoted = roomMovies[roomMovie].voted?.includes(
          currentUser.email
        );
        if (!isCurrentUserVoted) {
          let movieDetails = !isNil(moviesDetails[roomMovie])
            ? moviesDetails[roomMovie]
            : null;
          let movie = new Movie({
            name: roomMovie,
            ...roomMovies[roomMovie],
            ...movieDetails,
          });
          movies.push(movie);
        }
      }
      setInitialMovies(movies);
    });
    moviesRef.on("child_changed", (snapshot) => {
      const isMovieHasTwoLikes = snapshot.val().likes === 2;
      if (isMovieHasTwoLikes) {
        const movieName = snapshot.key;
        setMatchedMovieName(movieName);
      }
    });
  }, []);

  useEffect(() => {
    let matchedMovie = movies.find((movie) => movie.name === matchedMovieName);
    setMatchedMovie(matchedMovie);
  }, [matchedMovieName]);

  useEffect(() => {
    let currentMovies = !isEmpty(movies) ? [...movies] : [...initialMovies];
    moviesRef.on("child_added", async (snapshot) => {
      let addedMovieName = snapshot.key;
      let addedMovieValues = snapshot.val();
      let isMovieInCurrentMovies = currentMovies.some(
        (movie) => movie.name === addedMovieName
      );
      let isCurrentUserVoted = addedMovieValues.voted?.includes(
        currentUser.email
      );
      if (
        !isMovieInCurrentMovies &&
        !isEmpty(initialMovies) &&
        !isCurrentUserVoted
      ) {
        let moviesDetails = await getMoviesDetails({ names: addedMovieName });
        let details = moviesDetails[addedMovieName];
        let newMovie = new Movie({
          name: addedMovieName,
          ...addedMovieValues,
          ...details,
        });
        currentMovies.push(newMovie);
      }
    });
    setMovies(currentMovies);
  }, [initialMovies]);

  return (
    <MoviesContext.Provider
      value={{
        state: {
          currentUserId: userId,
          currentRoomId: roomId,
          movies,
          currentMovieIndex,
          topCardPosition,
          matchedMovie,
        },
        mutations: {
          setCurrentMovieIndex: (index) => setCurrentMovieIndex(index),
          setTopCardPosition: (position) => setTopCardPosition(position),
          setMatchedMovie,
        },
        actions: {
          vote,
          endRoom,
          showErrorModal: () => setIsShowErrorModal(true),
        },
      }}
    >
      <View style={styles.movies}>
        <SwipeCardsList />
      </View>
      {!isNil(matchedMovie) && <Match />}
      <BaseModal
        isVisible={isShowErrorModal}
        buttonAction={() => setIsShowErrorModal(false)}
        text={errorModalText}
        buttonType={"SECONDARY_NEGATIVE"}
        buttonText={"Close"}
      />
    </MoviesContext.Provider>
  );
};

export default Movies;

const styles = StyleSheet.create({
  movies: {
    flex: 1,
  },
});
