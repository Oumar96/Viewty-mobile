import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const RoomCard = (props) => {
  const { room = {}, threeMovies = [] } = props;

  const firstMovie = { uri: threeMovies[0].poster };
  const secondMovie = { uri: threeMovies[1].poster };
  const thirdMovie = { uri: threeMovies[2].poster };

  /***********
   * Data
   ***********/
  let users = room.participants.users;
  return (
    <View style={styles.roomCard}>
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
        <Image style={styles.roomCardImageLeft} source={firstMovie} />
        <Image style={styles.roomCardImageCenter} source={secondMovie} />
        <Image style={styles.roomCardImageRight} source={thirdMovie} />
      </View>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  roomCard: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 16,
    height: SCREEN_HEIGHT / 3,
    borderRadius: 20,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.15,
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
    flex: 5,
    flexDirection: "row",
  },
  roomCardImageLeft: {
    flex: 1,
    height: "100%",
    borderBottomLeftRadius: 20,
  },
  roomCardImageCenter: {
    flex: 1,
    height: "100%",
  },
  roomCardImageRight: {
    flex: 1,
    height: "100%",
    borderBottomRightRadius: 20,
  },
  roomCardUser: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
});
