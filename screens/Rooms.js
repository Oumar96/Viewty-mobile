import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { isEqual, isNil, orderBy, isEmpty } from "lodash";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import firebase from "../firebase/firebase.js";

import MoviesApi from "../api/Movies.js";

//contexts
import HomeContext from "../contexts/HomeContext.js";
import RoomsContext from "../contexts/RoomsContext.js";

// components
import RoomCardsList from "../components/RoomCardsList.js";
const Stack = createSharedElementStackNavigator();

const RoomsComponent = ({ navigation }) => {
  const homeContext = useContext(HomeContext);

  /***********
   * Context State
   ***********/
  const userId = homeContext.state.userId;

  /***********
   * State
   ***********/
  const [roomIds, setRoomIds] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [moviesDetails, setMovieDetails] = useState([]);
  const [isInitialRoomsFetched, setIsInitalRoomsFetched] = useState(false);

  /***********
   * Data
   ***********/
  let roomIdsRef = firebase.database().ref(`users/${userId}/rooms`);
  let roomsRef = firebase.database().ref("rooms");

  /***********
   * Methods
   ***********/

  /**
   *
   * @param {Object} roomsObject,
   * @returns {Array}
   */
  const getRoomsFromSnapshot = (roomsObject) => {
    let newRooms = [];
    if (roomIds) {
      roomIds.forEach((roomId) => {
        const isCurrentlyInRooms = rooms.some(({ id }) => id === roomId);
        if (!isNil(roomsObject[roomId])) {
          newRooms.push({
            id: roomId,
            isNewRoom: !isCurrentlyInRooms && isInitialRoomsFetched,
            ...roomsObject[roomId],
          });
        }
      });
    }
    return newRooms;
  };
  /**
   *
   * @param {Object} roomsObject,
   * @returns {Array}
   */
  const getFirstThreeMovieNamesOfAllRooms = (roomsObject) => {
    let movieNames = [];
    if (roomIds) {
      roomIds.forEach((roomId) => {
        if (!isNil(roomsObject[roomId])) {
          movieNames = [
            ...movieNames,
            ...getRoomFirstTrheeMovieNames(roomsObject[roomId]),
          ];
        }
      });
    }
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

  /**
   *
   * @param {Object} rooms
   * @returns {Array}
   */
  const orderRoomsByCreatedDate = (rooms) => {
    return orderBy(rooms, "created_at", ["desc", "asc"]);
  };

  useEffect(() => {
    roomIdsRef.on("value", (snapshot) => {
      let snapshotUserRooms = snapshot.val();
      const snapshotUserRoomIds =
        !isEmpty(snapshotUserRooms) && Object.keys(snapshotUserRooms);
      if (!isEqual(snapshotUserRoomIds, roomIds)) {
        setRoomIds(snapshotUserRoomIds);
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
      setIsInitalRoomsFetched(true);
      setRooms(orderRoomsByCreatedDate(rooms));
      setMovieDetails(moviesDetails);
    });
  }, [roomIds]);

  return (
    <RoomsContext.Provider
      value={{
        state: {
          userId,
          rooms,
          moviesDetails,
          navigation,
        },
      }}
    >
      <View style={styles.rooms}>
        <View style={styles.roomCardsList}>
          <RoomCardsList />
        </View>
      </View>
    </RoomsContext.Provider>
  );
};

const Rooms = () => {
  return (
    <Stack.Navigator initialRouteName="Rooms Component">
      <Stack.Screen
        name="Rooms Component"
        component={RoomsComponent}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </Stack.Navigator>
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
  },
});
