import React, { useContext, useState } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { upperFirst } from "lodash";

// context
import ExpiredRoomContext from "../contexts/ExpiredRoomContext.js";
// components
import BaseImage from "../components/BaseImage.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const MovieDetails = (props) => {
  const { movie = {}, sharedElementId = "", style = {} } = props;

  const expiredRoomContext = useContext(ExpiredRoomContext);

  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);
  const [descriptionNumberOfLines, setDescriptionNumberOfLines] = useState(5);

  /***********
   * Data
   ***********/
  const navigation = expiredRoomContext.state.navigation;

  const toggleCollapseDescription = () => {
    setIsDescriptionCollapsed(!isDescriptionCollapsed);
    descriptionNumberOfLines === 5
      ? setDescriptionNumberOfLines(0)
      : setDescriptionNumberOfLines(5);
  };
  const getCollapseIconName = () => {
    return isDescriptionCollapsed ? "chevron-thin-down" : "chevron-thin-up";
  };
  return (
    <View style={styles.movieDetailsContainer}>
      <SharedElement id={sharedElementId} style={styles.movieImageContainer}>
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
          <BaseImage style={styles.movieImage} source={movie.poster} />
        </View>
      </SharedElement>
      <View style={styles.details}>
        <View style={styles.movieNameContainer}>
          <Text style={styles.movieNameText}>{upperFirst(movie.name)}</Text>
        </View>
        <View style={styles.delimiter}></View>
        <View style={styles.movieDescription}>
          <Text numberOfLines={descriptionNumberOfLines}>
            {movie.description}
          </Text>
        </View>
        <View style={styles.delimiter}></View>
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
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  movieDetailsContainer: {
    width: "100%",
    borderRadius: 20,
    borderColor: "#f2f2f2",
    alignSelf: "center",
    elevation: 7,
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
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
