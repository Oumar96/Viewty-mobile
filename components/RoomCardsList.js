import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import RoomsContext from "../contexts/RoomsContext.js";
import RoomCard from "./RoomCard.js";

const RoomCardsList = () => {
  const roomsContext = useContext(RoomsContext);

  /***********
   * Context State
   ***********/
  const rooms = roomsContext.state.rooms;
  const moviesDetails = roomsContext.state.moviesDetails;

  /***********
   * Methods
   ***********/

  /**
   *
   * @param {Object} room
   * @returns {Array}
   */
  const getFirstThreeMoviesDetails = (room) => {
    let roomMovies = Object.keys(room.movies);
    let firstThreeMoviesDetails = [
      moviesDetails[roomMovies[0]],
      moviesDetails[roomMovies[1]],
      moviesDetails[roomMovies[2]],
    ];

    return firstThreeMoviesDetails;
  };

  /**
   *
   * @param {Object} room
   * @returns {JSX}
   */
  const renderRoom = ({ item }) => {
    const firstTrheeMovies = getFirstThreeMoviesDetails(item);
    return <RoomCard room={item} threeMovies={firstTrheeMovies} />;
  };

  return (
    <FlatList
      style={styles.roomCardsList}
      data={rooms}
      renderItem={renderRoom}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default RoomCardsList;

const styles = StyleSheet.create({
  roomCardsList: {
    width: "80%",
  },
});
