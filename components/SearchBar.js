import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = (props) => {
  const { style = {}, value = "", handleOnChange = () => {} } = props;

  return (
    <View style={[styles.searchBar, style]}>
      <AntDesign name="search1" size={20} color="#cccccc" />
      <TextInput
        value={value}
        onChangeText={handleOnChange}
        placeholder="Search a username"
        placeholderTextColor="#cccccc"
        style={styles.searchBarInput}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
    elevation: 7,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    borderRadius: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  searchBarInput: {
    fontSize: 16,
    marginLeft: 10,
    width: "100%",
  },
});
