import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { isEmpty } from "lodash";

import SearchBar from "../components/SearchBar.js";
import SearchResultsInstructions from "../components/SearchResultsInstructions.js";
import SearchResults from "../components/SearchResults.js";

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
      fullName.toUpperCase().includes(searchValue.toUpperCase())
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
        <SearchResults users={users} style={styles.searchResults} />
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
    width: "90%",
  },
  searchResults: {
    width: "90%",
  },
});
