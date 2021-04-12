import React, { useState } from "react";
import { Image } from "react-native";
import { isNil } from "lodash";

const getImage = (source, fallbackImage) => {
  return !isNil(source) ? { uri: source } : fallbackImage;
};
const BaseImage = (props) => {
  const { source = null, style = null, fallbackSource = null } = props;

  /***********
   * Data
   ***********/
  const fallbackImage = !isNil(fallbackSource)
    ? fallbackSource
    : require("../assets/default.jpg");

  /***********
   * Context State
   ***********/
  const [image, setImage] = useState(getImage(source, fallbackImage));

  /***********
   * Methods
   ***********/
  const setImageToFallback = (e) => {
    setImage(fallbackImage);
  };

  return (
    <Image
      style={style}
      defaultSource={fallbackImage}
      source={image}
      onError={setImageToFallback}
    />
  );
};

export default BaseImage;
