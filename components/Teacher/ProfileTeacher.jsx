import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

import ClassList from "./ClassList";
import CreateClass from "./CreateClass";
const Tab = createBottomTabNavigator();
const ProfileTeacher = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Create Class"
        component={CreateClass}
        options={{
          tabBarIcon: () => <Icon name="add-circle-outline" />,
        }}
      />
      <Tab.Screen
        name="Class List"
        component={ClassList}
        options={{
          tabBarIcon: () => <Icon name="newspaper-outline" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default ProfileTeacher;
