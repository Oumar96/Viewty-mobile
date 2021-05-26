import React from "react";
import { View, StyleSheet } from "react-native";
import UserItem from "./UserItem.js";

const SearchResults = (props) => {
  const { users = [], style = {} } = props;

  const selectItem = () => {
    console.log("itemSelected");
  };

  return (
    <View style={[style]}>
      {users.map((user, index) => (
        <UserItem
          user={user}
          key={index}
          style={styles.userItem}
          onPress={selectItem}
        />
      ))}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  userItem: {
    backgroundColor: "white",
    height: 70,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#f2f2f2",
    alignItems: "center",
  },
});
