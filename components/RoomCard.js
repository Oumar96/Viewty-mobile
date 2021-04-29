import React, { useContext } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { isNil } from "lodash";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

// context
import RoomsContext from "../contexts/RoomsContext.js";
// components
import BaseImage from "./BaseImage.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const CARD_HEIGHT = SCREEN_HEIGHT / 3;
const CARD_MARGIN = 32;

/**
 * @param {Boolean} isRoomExpired
 * @param {Boolean} isRoomPending
 * @returns {String}
 */
const getStatus = (isRoomExpired, isRoomPending) => {
  let status = "";
  if (isRoomExpired) {
    status = "expired";
  } else if (isRoomPending) {
    status = "pending";
  } else {
    status = "active";
  }

  return status;
};

const RoomCard = (props) => {
  const { index = 0, room = {}, threeMovies = [], yCoordinate = {} } = props;
  const roomsContext = useContext(RoomsContext);

  /***********
   * Context State
   ***********/
  const userId = roomsContext.state.userId;
  const navigation = roomsContext.state.navigation;

  /***********
   * Data
   ***********/
  let users = room.participants.users;
  const isRoomExpired = !isNil(room.result);
  const isRoomPending = !isNil(room.participants)
    ? room.participants.accepted < 2
    : false;
  const status = getStatus(isRoomExpired, isRoomPending);
  const finalMovie = isRoomExpired ? room.result.movie : null;

  // Animation data
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

  /***********
   * Methods
   ***********/
  const handleClickCard = () => {
    return {
      active: goToMovies,
      pending: goToPendingRoom,
      expired: goToExpiredRoom,
    }[status]();
  };

  const goToMovies = () => {
    navigation.navigate("Movies", {
      userId,
      roomId: room.id,
    });
  };

  const goToPendingRoom = () => {
    console.log("pendingRoom action not created yet");
  };

  const goToExpiredRoom = () => {
    navigation.navigate("ExpiredRoom", {
      room,
    });
  };

  return (
    <Animated.View style={[styles.roomCard, animationStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.roomCardTouchable}
        onPress={handleClickCard}
      >
        {/* <View style={styles.roomCardTitle}>
          <View style={styles.participants}>
            {users.map((user, index) => (
              <Text key={index} style={styles.roomCardUser}>
                John Smith
              </Text>
            ))}
          </View>
          <View style={styles.status}>
            <Text style={styles[`statusText__${status}`]}>{status}</Text>
          </View>
        </View> */}
        <View style={styles.roomCardImages}>
          {isRoomExpired ? (
            <SharedElement id={`room-${room.id}`} style={styles.sharedElement}>
              <BaseImage
                style={styles.roomCardImage}
                source={finalMovie.poster}
              />
            </SharedElement>
          ) : (
            <>
              {threeMovies.map((movie, index) => (
                <BaseImage
                  key={index}
                  style={styles.roomCardImage}
                  source={movie.poster}
                />
              ))}
            </>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  roomCard: {
    flex: 1,
    backgroundColor: "white",
    height: CARD_HEIGHT,
    marginBottom: 10,
    borderRadius: 20,
  },
  roomCardTouchable: {
    flex: 1,
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
  statusText__active: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#22f253",
  },
  statusText__pending: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#de8a02",
  },
  statusText__expired: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
  },
  roomCardImages: {
    flex: 6,
    flexDirection: "row",
  },
  roomCardImage: {
    flex: 1,
    height: "100%",
  },
  roomCardUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  sharedElement: {
    flex: 1,
  },
});
