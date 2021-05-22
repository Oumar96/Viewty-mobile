import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { isEmpty } from "lodash";

import SearchBar from "../components/SearchBar.js";
import SearchResultsInstructions from "../components/SearchResultsInstructions.js";

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
      {isEmpty(searchValue) ? (
        <SearchResultsInstructions />
      ) : (
        <View>
          {users.map((user) => (
            <Text>{user.fullName}</Text>
          ))}
        </View>
      )}
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
  },
});
