import { Text } from "@rneui/themed";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateAccount from "../../components/Admin/CreateAccount";
import CreateSubject from "../../components/Admin/CreateSubject";
import UserList from "../../components/Admin/UserList";
import ClassList from "../../components/Admin/ClassList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Setting from "../Setting";
import AboutUs from "../AboutUs";
import BottomTab from "../../components/Admin/Profile";
import Profile from "../../components/Admin/Profile";
import Logout from "../../components/Admin/Logout";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeAdmin = () => {
  return (
    <>
      {/* <BottomTab /> */}
      <Drawer.Navigator initialRouteName="BottomTab">
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeAdmin;
