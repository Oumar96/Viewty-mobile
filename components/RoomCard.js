import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const RoomCard = (props) => {
  const { room = {} } = props;

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
        <Image
          style={styles.roomCardImageLeft}
          source={require("../assets/gradient.jpg")}
        />
        <Image
          style={styles.roomCardImageCenter}
          source={require("../assets/1.jpg")}
        />
        <Image
          style={styles.roomCardImageRight}
          source={require("../assets/3.jpg")}
        />
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
    flex: 1,
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
    flex: 3,
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
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
});
