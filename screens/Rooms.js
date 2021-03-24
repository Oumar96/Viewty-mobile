import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { isEqual, isNil } from "lodash";

import firebase from "../firebase/firebase.js";

import RoomCard from "../components/RoomCard.js";

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
    // use api
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

  const renderRoom = ({ item }) => <RoomCard room={item} />;

  return (
    <View style={styles.rooms}>
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
      />
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
