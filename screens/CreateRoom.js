import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { isEmpty, isNil, debounce } from "lodash";

import UsersApi from "../api/Users.js";

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

  const getUsers = async (name) => {
    console.log("debounce called");
    try {
      const response = await UsersApi.getUsers({
        params: {
          search: name,
        },
      });
      console.log("response", response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const debouncedGetUsers = useCallback(
    debounce(async (text) => await getUsers(text), 2000),
    []
  );

  const handleSearchValueChange = async (text) => {
    setSearchValue(text);
    if (text) {
      await debouncedGetUsers(text);
      console.log("after response");
    }
  };

  // useEffect(() => {
  //   const filteredNames = usersArray.filter(({ name }) =>
  //     name.toUpperCase().includes(searchValue.toUpperCase())
  //   );
  //   setUsers(filteredNames);
  // }, [searchValue]);

  return (
    <View style={styles.createRoom}>
      <SearchBar
        style={styles.searchBar}
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      {isEmpty(searchValue) ? (
        <SearchResultsInstructions />
      ) : (
        <SearchResults
          users={users}
          style={styles.searchResults}
          onUserSelected={setSelectedUser}
        />
      )}
      <BaseModal
        isVisible={!isNil(selectedUser)}
        buttonAction={() => setSelectedUser}
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
