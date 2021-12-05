import React, { useState, useCallback, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { isEmpty, isNil, debounce } from "lodash";
import { Ionicons } from "@expo/vector-icons";

import UsersApi from "../api/Users.js";
import RoomsApi from "../api/Rooms.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import SearchBar from "../components/SearchBar.js";
import SearchResultsInstructions from "../components/SearchResultsInstructions.js";
import SearchResults from "../components/SearchResults.js";
import BaseModal from "../components/BaseModal.js";

const CreateRoom = () => {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext.state.currentUser;

  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalText, setModalText] = useState(false);
  const [modalButtonType, setModalButtonType] = useState("PRIMARY");
  const [modalButtonText, setModalButtonText] = useState(false);
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);

  /***********
   * Methods
   ***********/

  const configureModal = (status, user = {}) => {
    if (status === "success") {
      setModalText(`An invitation will be sent to ${user.email}`);
      setModalButtonType("PRIMARY");
      setModalButtonText("Confirm");
    } else if (status === "error") {
      setModalText(`An error occured please contact support`);
      setModalButtonType("SECONDARY_NEGATIVE");
      setModalButtonText("Close");
    }
  };
  const inviteUser = async (user) => {
    try {
      configureModal("success", user);
      await RoomsApi.create({
        user: currentUser.email,
        invited: [user.email],
      });
    } catch (e) {
      configureModal("error");
    } finally {
      setIsShowModal(true);
    }
  };

  const modalButtonAction = () => {
    setIsShowModal(false);
  };
  const getUsers = async (name) => {
    try {
      const response = await UsersApi.getUsers({
        params: {
          search: name,
        },
      });
      const users = response.data.data.filter(
        ({ email }) => email !== currentUser.email
      );
      setUsers(users);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingSearchResults(false);
    }
  };
  const handleSearchValueChange = useCallback(async (text) => {
    setIsLoadingSearchResults(true);
    setSearchValue(text);
    if (text) {
      await debounce(async () => await getUsers(text), 2000)(); // might cause async bugs
    } else {
      setUsers([]);
    }
  }, []);

  return (
    <View style={styles.createRoom}>
      <SearchBar
        style={styles.searchBar}
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      {(() => {
        if (isEmpty(searchValue)) {
          return (
            <SearchResultsInstructions
              text="Find your friends and start swipping movies."
              icon={<Ionicons name="happy-outline" size={50} color="#b5b5b5" />}
            />
          );
        } else if (isLoadingSearchResults) {
          return <ActivityIndicator color="#0f9bf2" size="large" />;
        } else if (isEmpty(users)) {
          return (
            <SearchResultsInstructions
              textStyle={styles.noUserFoundInstructions}
              text={`We could not find a user with the email ${searchValue}`}
              icon={<Ionicons name="sad-outline" size={50} color="red" />}
            />
          );
        } else {
          return (
            <SearchResults
              users={users}
              style={styles.searchResults}
              onUserSelected={inviteUser}
            />
          );
        }
      })()}
      <BaseModal
        isVisible={isShowModal}
        buttonAction={modalButtonAction}
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
  noUserFoundInstructions: {
    color: "red",
  },
});
