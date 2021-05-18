import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    <View style={styles.searchBar}>
      <AntDesign name="search1" size={24} color="black" />
      <TextInput placeholder="Search" style={styles.searchBarInput} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {},
  searchBarInput: {},
});
