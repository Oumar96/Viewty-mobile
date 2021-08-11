import AsyncStorage from "@react-native-async-storage/async-storage";

export const setTokenForUser = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {}
};
