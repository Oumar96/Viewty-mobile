import React, { useState } from "react";
import { isNil, toLower } from "lodash";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const BaseButton = (props) => {
  const {
    id = "",
    type = "PRIMARY",
    text = "",
    onPress = () => {},
    icon = null,
    underlayIcon = null,
    style = {},
  } = props;

  const types = {
    PRIMARY: {
      style: {
        borderColor: "#0f9bf2",
        backgroundColor: "#0f9bf2",
      },
      underlayColor: "#0f9bf2",
      textColor: "white",
      underlayTextColor: "white",
    },
    PRIMARY_NEGATIVE: {
      style: {
        borderColor: "#0f9bf2",
        backgroundColor: "white",
      },
      underlayColor: "#0f9bf2",
      textColor: "#0f9bf2",
      underlayTextColor: "white",
    },
    SECONDARY_NEGATIVE: {
      style: {
        borderColor: "red",
        backgroundColor: "white",
      },
      underlayColor: "red",
      textColor: "red",
      underlayTextColor: "white",
    },
    PRIMARY_TRANSPARENT: {
      style: {
        borderColor: "white",
        backgroundColor: "transparent",
      },
      underlayColor: "#0f9bf2",
      textColor: "white",
      underlayTextColor: "white",
    },
    SECONDARY_TRANSPARENT: {
      style: {
        borderColor: "white",
        backgroundColor: "transparent",
      },
      underlayColor: "white",
      textColor: "white",
      underlayTextColor: "black",
    },
  };
  const currentTypeValues = types[type];

  const [buttonTextColor, setButtonTextColor] = useState({
    color: currentTypeValues.textColor,
  });

  const [currentIcon, setCurrentIcon] = useState(icon);

  const onShowUnderlay = () => {
    setButtonTextColor({ color: currentTypeValues.underlayTextColor });
    if (!isNil(underlayIcon)) {
      setCurrentIcon(underlayIcon);
    }
  };
  const onHideUnderlay = () => {
    setButtonTextColor({ color: currentTypeValues.textColor });
    setCurrentIcon(icon);
  };

  return (
    <TouchableHighlight
      id={id}
      style={[styles.button, currentTypeValues.style, style]}
      underlayColor={currentTypeValues.underlayColor}
      onPress={onPress}
      onShowUnderlay={onShowUnderlay}
      onHideUnderlay={onHideUnderlay}
    >
      <View style={styles.buttonContent}>
        {currentIcon && currentIcon}
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
    justifyContent: "center",
    color: "white",
  },
  buttonContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  primary_negativeButtonText: {
    color: "#0f9bf2",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  secondary_negativeButtonText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
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
