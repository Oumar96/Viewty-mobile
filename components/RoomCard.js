import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const RoomCard = (props) => {
  const { room = {} } = props;

  /***********
   * Data
   ***********/
  let users = room.participants.users;
  return (
    <View style={styles.roomCard}>
      <ImageBackground
        style={styles.image}
        imageStyle={styles.imageStyle}
        source={require("../assets/gradient.jpg")}
      >
        <View style={styles.status}>
          <Text style={styles.statusText}>Actif</Text>
        </View>
        <View style={styles.roomCardUsersContainer}>
          {users.map((user, index) => (
            <Text key={index} style={styles.roomCardUser}>
              {user}
            </Text>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  roomCard: {
    flex: 1,
    backgroundColor: "red",
    marginTop: 15,
    height: SCREEN_HEIGHT / 4,
    borderRadius: 20,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  imageStyle: {
    borderRadius: 20,
  },
  roomCardUsersContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  roomCardUser: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  status: {
    width: "100%",
    marginTop: 30,
    paddingRight: 20,
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22f253",
  },
});
