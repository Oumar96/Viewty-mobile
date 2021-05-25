import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchResultItem = (props) => {
  const { user = {}, style = {} } = props;

  return (
    <View style={[styles.searchResultItem, style]}>
      <Text>{user.fullName}</Text>
    </View>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({
  searchResultItem: {
    backgroundColor: "white",
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#f2f2f2",
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
