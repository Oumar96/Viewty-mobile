import React from "react";
import { FlatList, StyleSheet, Animated } from "react-native";

import RoomCard from "./RoomCard.js";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RoomCardsList = (props) => {
  /***********
   * Props
   ***********/
  const { rooms = [], moviesDetails = [] } = props;

  /***********
   * Data
   ***********/
  const yCoordinate = new Animated.Value(0);
  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: yCoordinate,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

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
  const renderRoom = ({ item, index }) => {
    const firstTrheeMovies = getFirstThreeMoviesDetails(item);
    return (
      <RoomCard
        index={index}
        room={item}
        threeMovies={firstTrheeMovies}
        yCoordinate={yCoordinate}
      />
    );
  };

  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      style={styles.roomCardsList}
      data={rooms}
      renderItem={renderRoom}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...{ onScroll }}
    />
  );
};

export default RoomCardsList;

const styles = StyleSheet.create({
  roomCardsList: {
    width: "95%",
    marginTop: 10,
  },
});
