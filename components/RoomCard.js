import React from "react";
import { isNil } from "lodash";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import BaseImage from "./BaseImage.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const CARD_HEIGHT = SCREEN_HEIGHT / 3;
const CARD_MARGIN = 32;

const RoomCard = (props) => {
  const { index = 0, room = {}, threeMovies = [], yCoordinate = {} } = props;
  const firstMovie = !isNil(threeMovies[0]) ? threeMovies[0].poster : null;
  const secondMovie = !isNil(threeMovies[1]) ? threeMovies[1].poster : null;
  const thirdMovie = !isNil(threeMovies[2]) ? threeMovies[2].poster : null;

  /***********
   * Data
   ***********/
  let users = room.participants.users;
  const position = Animated.subtract(index * CARD_HEIGHT, yCoordinate);
  const disappearPosition = -CARD_HEIGHT;
  const topCardPosition = 0;
  const bottomCardPosition = SCREEN_HEIGHT - CARD_HEIGHT;
  const appearPosition = SCREEN_HEIGHT;
  const animateInputPosition = 0.00001 + index * (CARD_HEIGHT + CARD_MARGIN);
  const animateOutputPosition = -index * (CARD_HEIGHT + CARD_MARGIN);
  const translateY = Animated.add(
    yCoordinate,
    yCoordinate.interpolate({
      inputRange: [0, animateInputPosition],
      outputRange: [0, animateOutputPosition],
      extrapolateRight: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [
      disappearPosition,
      topCardPosition,
      bottomCardPosition,
      appearPosition,
    ],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [
      disappearPosition,
      topCardPosition,
      bottomCardPosition,
      appearPosition,
    ],
    outputRange: [0.5, 1, 1, 0.5],
  });

  const animationStyle = {
    opacity,
    transform: [
      {
        translateY,
      },
      {
        scale,
      },
    ],
  };
  return (
    <Animated.View style={[styles.roomCard, animationStyle]}>
      <View style={styles.roomCardTitle}>
        <View style={styles.participants}>
          {users.map((user, index) => (
            <Text key={index} style={styles.roomCardUser}>
              {/* {user} */} John Smith
            </Text>
          ))}
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>active</Text>
        </View>
      </View>
      <View style={styles.roomCardImages}>
        <BaseImage style={styles.roomCardImageLeft} source={firstMovie} />
        <BaseImage style={styles.roomCardImageCenter} source={secondMovie} />
        <BaseImage style={styles.roomCardImageRight} source={thirdMovie} />
      </View>
    </Animated.View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  roomCard: {
    flex: 1,
    backgroundColor: "white",
    height: CARD_HEIGHT,
    marginBottom: 3,
  },
  roomCardTitle: {
    flex: 2,
    padding: 10,
    flexDirection: "row",
  },
  participants: {
    flex: 4,
  },
  status: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22f253",
  },
  roomCardImages: {
    flex: 6,
    flexDirection: "row",
  },
  roomCardImageLeft: {
    flex: 1,
    height: "100%",
  },
  roomCardImageCenter: {
    flex: 1,
    height: "100%",
  },
  roomCardImageRight: {
    flex: 1,
    height: "100%",
  },
  roomCardUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
});
