import React from "react";
import { Text } from "react-native";
import CreateAccount from "./CreateAccount";
import CreateSubject from "./CreateSubject";
import UserList from "./UserList";
import ClassList from "./ClassList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Profile = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Create Account"
        component={CreateAccount}
        options={{
          tabBarIcon: () => <Icon name="person-add-outline" />,
        }}
      />
      <Tab.Screen
        name="Create Subject"
        component={CreateSubject}
        options={{
          tabBarIcon: () => <Icon name="file-tray-full-outline" />,
        }}
      />
      <Tab.Screen
        name="User List"
        component={UserList}
        options={{
          tabBarIcon: () => <Icon name="people-outline" />,
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

export default Profile;
