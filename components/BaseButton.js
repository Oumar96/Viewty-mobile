import React, { useState } from "react";
import { isNil, toLower } from "lodash";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const BaseButton = (props) => {
  const {
    type = "PRIMARY",
    text = "",
    onPress = () => {},
    icon = null,
    style = {},
  } = props;

  console.log(icon);

  const types = {
    PRIMARY_TRANSPARENT: {
      style: {
        borderColor: "white",
        backgroundColor: "white",
      },
      underlayColor: "#0f9bf2",
      textColor: "white",
      underlayTextColor: "black",
    },
    SECONDARY_TRANSPARENT: {
      style: {
        borderColor: "white",
        backgroundColor: "white",
      },
      underlayColor: "white",
      textColor: "white",
      underlayTextColor: "black",
    },
  };
  const currentTypeValues = types[type];

  [buttonTextColor, setButtonTextColor] = useState({
    color: currentTypeValues.textColor,
  });

  return (
    <TouchableHighlight
      style={[styles.button, currentTypeValues.style, style]}
      underlayColor={currentTypeValues.underlayColor}
      onPress={onPress}
      onShowUnderlay={() => {
        setButtonTextColor({ color: currentTypeValues.underlayTextColor });
      }}
      onHideUnderlay={() => {
        setButtonTextColor({ color: currentTypeValues.textColor });
      }}
    >
      <View style={styles.buttonContent}>
        {!isNil(icon) && icon}
        <Text style={[styles[`${toLower(type)}ButtonText`], buttonTextColor]}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
    color: "white",
  },
  buttonContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  primary_transparentButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  secondary_transparentButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});
