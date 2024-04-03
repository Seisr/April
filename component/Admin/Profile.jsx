import React from "react";
import { Text } from "react-native";
import CreateAccount from "./CreateAccount";
import CreateSubject from "./CreateSubject";
import UserList from "./UserList";
import ClassList from "./ClassList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Profile = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="createAccount" component={CreateAccount} />
      <Tab.Screen name="createSubject" component={CreateSubject} />
      <Tab.Screen name="userList" component={UserList} />
      <Tab.Screen name="classList" component={ClassList} />
    </Tab.Navigator>
  );
};

export default Profile;
