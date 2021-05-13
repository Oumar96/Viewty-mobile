import React from "react";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

// components
import BaseImage from "./BaseImage.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const MovieBanner = (props) => {
  const { image = null, sharedElementId = "", style = {} } = props;

  /***********
   * Data
   ***********/
  const navigation = useNavigation();

  return (
    <SharedElement
      id={sharedElementId}
      style={[styles.movieImageContainer, style]}
    >
      <View style={styles.imageAndCloseView}>
        <AntDesign
          name="closecircle"
          size={24}
          color="#bababa"
          style={styles.closeButton}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <BaseImage style={styles.movieImage} source={image} />
      </View>
    </SharedElement>
  );
};

export default MovieBanner;

const styles = StyleSheet.create({
  movieImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT * 0.55,
    width: "100%",
    elevation: 7,
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  imageAndCloseView: {
    flex: 1,
    width: "100%",
  },
  movieImage: {
    height: "100%",
    width: "100%",
    borderColor: "#c9c9c9",
  },
  closeButton: {
    position: "absolute",
    right: "6%",
    top: "10%",
    zIndex: 1000,
  },
});
