import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import SearchBar from "../components/SearchBar.js";

const CreateRoom = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const usersArray = [
    { id: 1, fullName: "John Travolta" },
    { id: 2, fullName: "Jackie Chan" },
    { id: 3, fullName: "Big Popa" },
  ];

  useEffect(() => {
    const filteredNames = usersArray.filter(({ fullName }) =>
      fullName.includes(searchValue)
    );
    setUsers(filteredNames);
  }, [searchValue]);

  return (
    <View style={styles.createRoom}>
      <SearchBar
        style={styles.searchBar}
        value={searchValue}
        handleOnChange={setSearchValue}
      />
      <View>
        {users.map((user) => (
          <Text>{user.fullName}</Text>
        ))}
      </View>
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  createRoom: {
    flex: 1,
    alignItems: "center",
  },
  searchBar: {
    marginVertical: 10,
    borderRadius: 20,
  },
});
