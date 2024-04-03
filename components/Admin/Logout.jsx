import React from "react";
import { Text } from "react-native";
import CreateAccount from "../Admin/CreateAccount";
import CreateSubject from "../Admin/CreateSubject";
import UserList from "../Admin/UserList";
import ClassList from "../Admin/ClassList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Logout = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="createAccount" component={CreateAccount} />
      <Tab.Screen name="createSubject" component={CreateSubject} />
      <Tab.Screen name="userList" component={UserList} />
      <Tab.Screen name="classList" component={ClassList} />
    </Tab.Navigator>
  );
};

export default Logout;
