import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";
import firebase from "../firebase/firebase.js";

import MoviesContext from "../contexts/MoviesContext.js";
import SwipeCardsList from "../components/SwipeCardsList.js";
const USER_ID = "5145753393";
const ROOM_ID = "a9ee2bb6-66d7-4e1f-a282-3ecbc01cb707";
const Movies = () => {
  // just for testing
  let [movies, setMovies] = useState([]);

  useEffect(() => {
    const roomsRef = firebase.database().ref("rooms");
    roomsRef.on("value", (snapshot) => {
      let currentRoom = snapshot.child(ROOM_ID);
      let roomMovies = currentRoom.child("movies").val();
      let movies = [];
      for (let movie in roomMovies) {
        if (roomMovies[movie][USER_ID] === "none") {
          movies.push({
            name: movie,
            ...roomMovies[movie],
          });
        }
      }
      setMovies(movies);
    });
  }, []);

  // const movies = [
  //     { id: "1", uri: require('../assets/1.jpg') },
  //     { id: "2", uri: require('../assets/2.jpg') },
  //     { id: "3", uri: require('../assets/3.jpg') },
  //     { id: "4", uri: require('../assets/4.jpg') },
  //     { id: "5", uri: require('../assets/5.jpg') },
  // ]

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [topCardPosition, setTopCardPosition] = useState(
    new Animated.ValueXY()
  );
  return (
    <MoviesContext.Provider
      value={{
        state: {
          movies,
          currentMovieIndex,
          topCardPosition,
        },
        mutations: {
          setCurrentMovieIndex: (index) => setCurrentMovieIndex(index),
          setTopCardPosition: (position) => setTopCardPosition(position),
        },
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}></View>
        <SwipeCardsList />
        <View style={{ height: 60 }}></View>
      </View>
    </MoviesContext.Provider>
  );
};

export default Movies;
