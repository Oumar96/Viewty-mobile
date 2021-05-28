import React from "react";
import { View, StyleSheet } from "react-native";
import UserItem from "./UserItem.js";
import BaseButton from "./BaseButton.js";

const SearchResults = (props) => {
  const { users = [], style = {} } = props;

  const selectItem = () => {
    console.log("itemSelected");
  };

  return (
    <View style={[style]}>
      {users.map((user, index) => (
        <View style={styles.userItemContainer}>
          <UserItem user={user} key={index} style={styles.userItem} />
          <BaseButton
            type="PRIMARY_NEGATIVE"
            style={styles.invite}
            onPress={selectItem}
            text="invite"
          />
        </View>
      ))}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#f2f2f2",
  },
  userItem: {
    height: 70,
    alignItems: "center",
  },
  invite: {
    marginHorizontal: 20,
    borderRadius: 5,
  },
});
