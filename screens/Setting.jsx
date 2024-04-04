import React from "react";
import { Text } from "react-native";
import CreateAccount from "../components/Admin/CreateAccount";
import CreateSubject from "../components/Admin/CreateSubject";
import UserList from "../components/Admin/UserList";
import ClassList from "../components/Admin/ClassList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const DrawerSide = () => {
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

export default DrawerSide;
