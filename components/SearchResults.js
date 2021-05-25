import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchResultItem from "./SearchResultItem.js";

const SearchResults = (props) => {
  const { users = [], style = {} } = props;

  return (
    <View style={[style]}>
      {users.map((user) => (
        <SearchResultItem user={user} />
      ))}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
