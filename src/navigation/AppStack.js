import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioRecord from "../screens/AudioRecord";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Record" component={AudioRecord} />

      {/* Add more Tab.Screen components for other screens */}
    </Tab.Navigator>
  );
};

export default AppStack;
