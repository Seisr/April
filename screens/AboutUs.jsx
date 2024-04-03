import React from "react";
import { Text } from "react-native";
import CreateAccount from "../component/Admin/CreateAccount";
import CreateSubject from "../component/Admin/CreateSubject";
import UserList from "../component/Admin/UserList";
import ClassList from "../component/Admin/ClassList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const AboutUs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="createAccount" component={CreateAccount} />
      <Tab.Screen name="createSubject" component={CreateSubject} />
      <Tab.Screen name="userList" component={UserList} />
      <Tab.Screen name="classList" component={ClassList} />
    </Tab.Navigator>
  );
};

export default AboutUs;
