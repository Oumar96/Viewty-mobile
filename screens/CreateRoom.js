import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { isEmpty, isNil } from "lodash";

import SearchBar from "../components/SearchBar.js";
import SearchResultsInstructions from "../components/SearchResultsInstructions.js";
import SearchResults from "../components/SearchResults.js";
import BaseModal from "../components/BaseModal.js";

const CreateRoom = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersArray = [
    { id: 1, name: "John Travolta" },
    { id: 2, name: "Jackie Chan" },
    { id: 3, name: "Big Popa" },
  ];

  /***********
   * Data
   ***********/
  const modalText = !isEmpty(selectedUser)
    ? `An invitation will be sent to ${selectedUser.name}`
    : "An error occured please contact support";

  const modalButtonType = !isEmpty(selectedUser) ? "PRIMARY" : "SECONDARY";

  const modalButtonText = !isEmpty(selectedUser) ? "Confirm" : "Close";

  /***********
   * Methods
   ***********/
  const removeSelectedUsers = () => {
    setSelectedUser(null);
  };
  /**
   *
   * @param {Object} user
   */
  const selectUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const filteredNames = usersArray.filter(({ name }) =>
      name.toUpperCase().includes(searchValue.toUpperCase())
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
        <SearchResults
          users={users}
          style={styles.searchResults}
          onUserSelected={selectUser}
        />
      )}
      <BaseModal
        isVisible={!isNil(selectedUser)}
        buttonAction={removeSelectedUsers}
        text={modalText}
        buttonType={modalButtonType}
        buttonText={modalButtonText}
      />
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
