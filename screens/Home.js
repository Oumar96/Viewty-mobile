// libs
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import Rooms from "./Rooms.js";
import CreateRoom from "./CreateRoom.js";
import Settings from "./Settings.js";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Rooms" component={Rooms} />
      <Tab.Screen name="Create Room" component={CreateRoom} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Home;
