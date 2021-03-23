import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { isEqual, isNil } from "lodash";

import firebase from "../firebase/firebase.js";

const USER_ID = "5145753393";

const Rooms = () => {
  const roomIdsRef = firebase.database().ref(`users/${USER_ID}/rooms`);
  const roomsRef = firebase.database().ref("rooms");

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
    <View style={styles.rooms}>
      {rooms.map((room) => {
        return <Text>{room.id}</Text>;
      })}
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  rooms: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
