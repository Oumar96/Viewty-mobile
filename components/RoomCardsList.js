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

  /***********
   * Methods
   ***********/
  const renderRoom = ({ item }) => <RoomCard room={item} />;

  return (
    <FlatList
      style={styles.roomCardsList}
      data={rooms}
      renderItem={renderRoom}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RoomCardsList;

const styles = StyleSheet.create({
  roomCardsList: {
    width: "80%",
  },
});
