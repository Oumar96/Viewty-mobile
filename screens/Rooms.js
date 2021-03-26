import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { isEqual, isNil } from "lodash";

import firebase from "../firebase/firebase.js";

import MoviesApi from "../api/Movies.js";

import RoomsContext from "../contexts/RoomsContext.js";

// components
import TopNavBar from "../components/TopNavBar.js";
import RoomCardsList from "../components/RoomCardsList.js";

const USER_ID = "5145753393";

const Rooms = () => {
  const roomIdsRef = firebase.database().ref(`users/${USER_ID}/rooms`);
  const roomsRef = firebase.database().ref("rooms");

  /***********
   * State
   ***********/
  const [roomIds, setRoomIds] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [moviesDetails, setMovieDetails] = useState([]);

  /***********
   * Methods
   ***********/

  /**
   *
   * @param {Object} roomsObject,
   * @returns {Array}
   */
  const getRoomsFromSnapshot = (roomsObject) => {
    let rooms = [];
    roomIds.forEach((roomId) => {
      if (!isNil(roomsObject[roomId])) {
        rooms.push({
          id: roomId,
          ...roomsObject[roomId],
        });
      }
    });
    return rooms;
  };
  /**
   *
   * @param {Object} roomsObject,
   * @returns {Array}
   */
  const getFirstThreeMovieNamesOfAllRooms = (roomsObject) => {
    let movieNames = [];
    roomIds.forEach((roomId) => {
      if (!isNil(roomsObject[roomId])) {
        movieNames = [
          ...movieNames,
          ...getRoomFirstTrheeMovieNames(roomsObject[roomId]),
        ];
      }
    });
    return movieNames;
  };

  /**
   * @param {Object} room
   * @returns {Array}
   */
  const getRoomFirstTrheeMovieNames = (room) => {
    let movies = Object.keys(room.movies);
    return [movies[0], movies[1], movies[2]];
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

  useEffect(() => {
    roomIdsRef.on("value", (snapshot) => {
      let snapshotRoomIds = snapshot.val();
      if (!isEqual(snapshotRoomIds, roomIds)) {
        setRoomIds(snapshotRoomIds);
      }
    });
  }, []);

  useEffect(() => {
    roomsRef.once("value", async (snapshot) => {
      let snapshotRooms = snapshot.val();
      let rooms = getRoomsFromSnapshot(snapshotRooms);
      let movieNames = getFirstThreeMovieNamesOfAllRooms(snapshotRooms);
      let moviesDetails = await getMoviesDetails({
        names: movieNames.join(),
      });
      setRooms(rooms);
      setMovieDetails(moviesDetails);
    });
  }, [roomIds]);

  return (
    <RoomsContext.Provider
      value={{
        state: {
          rooms,
          moviesDetails,
        },
      }}
    >
      <View style={styles.rooms}>
        <TopNavBar />
        <View style={styles.roomCardsList}>
          <RoomCardsList />
        </View>
      </View>
    </RoomsContext.Provider>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  rooms: {
    flex: 1,
  },
  roomCardsList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 120,
  },
});
