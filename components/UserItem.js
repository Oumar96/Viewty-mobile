import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const UserItem = (props) => {
  const { user = {}, style = {} } = props;

  return (
    <View style={[styles.user, style]}>
      <FontAwesome name="user-circle-o" size={24} color="black" />
      <Text numberOfLines={1} style={styles.userName}>
        {/*user.name*/ user.email}
      </Text>
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  userName: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600",
  },
});
