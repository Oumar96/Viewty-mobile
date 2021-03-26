import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { isEqual, isNil } from "lodash";

import firebase from "../firebase/firebase.js";

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

  useEffect(() => {
    roomIdsRef.on("value", (snapshot) => {
      let snapshotRoomIds = snapshot.val();
      if (!isEqual(snapshotRoomIds, roomIds)) {
        setRoomIds(snapshotRoomIds);
      }
    });
  }, []);

  useEffect(() => {
    roomsRef.once("value", (snapshot) => {
      let snapshotRooms = snapshot.val();
      let rooms = [];
      roomIds.forEach((roomId) => {
        if (!isNil(snapshotRooms[roomId])) {
          rooms.push({
            id: roomId,
            ...snapshotRooms[roomId],
          });
        }
      });
      setRooms(rooms);
    });
  }, [roomIds]);

  return (
    <RoomsContext.Provider
      value={{
        state: {
          rooms,
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
