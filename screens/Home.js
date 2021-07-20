// libs
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

// contexts
import HomeContext from "../contexts/HomeContext.js";
// screens
import Rooms from "./Rooms.js";
import CreateRoom from "./CreateRoom.js";
import Settings from "./Settings.js";

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  activeTintColor: "#0f9bf2",
  inactiveTintColor: "gray",
};

const getRoomsIcon = (focused, color, size) => {
  return (
    <Ionicons
      name={focused ? "home" : "home-outline"}
      size={size}
      color={color}
    />
  );
};
const getNewIcon = (focused, color, size) => {
  return (
    <AntDesign
      name={focused ? "pluscircle" : "pluscircleo"}
      size={size}
      color={color}
    />
  );
};
const getSettingsIcon = (focused, color, size) => {
  return (
    <Ionicons
      name={focused ? "settings" : "settings-outline"}
      size={size}
      color={color}
    />
  );
};
const getTabsIcons = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    return {
      Rooms: getRoomsIcon,
      New: getNewIcon,
      Settings: getSettingsIcon,
    }[route.name](focused, color, size);
  },
});

const Home = ({ navigation, route }) => {
  /***********
   * Route Data
   ***********/
  const routeUserId = route.params.userId;

  // add loading state
  return (
    <HomeContext.Provider
      value={{
        state: {
          userId: routeUserId,
          navigation,
        },
      }}
    >
      <Tab.Navigator
        initialRouteName="Rooms"
        screenOptions={getTabsIcons}
        tabBarOptions={tabBarOptions}
      >
        <Tab.Screen name="Rooms" component={Rooms} />
        <Tab.Screen name="New" component={CreateRoom} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </HomeContext.Provider>
  );
};

export default Home;
