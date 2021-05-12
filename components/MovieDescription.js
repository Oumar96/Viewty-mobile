import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  LayoutAnimation,
} from "react-native";
import { upperFirst } from "lodash";

const MovieDescription = (props) => {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const { movie } = props;

  /***********
   * State
   ***********/
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);
  const [descriptionNumberOfLines, setDescriptionNumberOfLines] = useState(5);

  /***********
   * Methods
   ***********/
  const toggleCollapseDescription = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsDescriptionCollapsed(!isDescriptionCollapsed);
    descriptionNumberOfLines === 5
      ? setDescriptionNumberOfLines(0)
      : setDescriptionNumberOfLines(5);
  };
  const getCollapseIconName = () => {
    return isDescriptionCollapsed ? "chevron-thin-down" : "chevron-thin-up";
  };

  return (
    <View style={styles.details}>
      <View style={styles.movieNameContainer}>
        <Text style={styles.movieNameText}>{upperFirst(movie.name)}</Text>
      </View>
      <View style={styles.delimiter} />
      <View style={styles.movieDescription}>
        <Text numberOfLines={descriptionNumberOfLines}>
          {movie.description}
        </Text>
      </View>
      <View style={styles.delimiter} />
      <Pressable
        style={styles.collapseContainer}
        onPress={toggleCollapseDescription}
      >
        <Entypo
          name={getCollapseIconName()}
          size={24}
          style={styles.chevron}
          color="#bababa"
        />
      </Pressable>
    </View>
  );
};

export default MovieDescription;

const styles = StyleSheet.create({
  details: {
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  movieNameContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  movieNameText: {
    fontWeight: "600",
    fontSize: 25,
    fontFamily: "FiraSans_400Regular",
    fontWeight: "bold",
  },
  delimiter: {
    width: "92%",
    alignSelf: "center",
    borderTopWidth: 1,
    borderColor: "#c9c9c9",
  },
  movieDescription: {
    padding: "4%",
  },
  chevron: {
    alignSelf: "center",
    marginVertical: 5,
  },
  description: {
    fontFamily: "FiraSans_400Regular",
  },
  closeButton: {
    position: "absolute",
    right: "6%",
    top: "10%",
    zIndex: 1000,
  },
  collapseContainer: {
    width: "100%",
  },
});
