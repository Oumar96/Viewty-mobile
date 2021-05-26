import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const UserItem = (props) => {
  const { user = {}, style = {}, onPress = () => {} } = props;

  return (
    <Pressable style={[styles.user, style]} onPress={onPress}>
      <FontAwesome name="user-circle-o" size={24} color="black" />
      <Text style={styles.userName}>{user.name /*"John Smith"*/}</Text>
    </Pressable>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  userName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
});
