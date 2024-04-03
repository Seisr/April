import { Text } from "@rneui/themed";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateAccount from "../../component/Admin/CreateAccount";
import CreateSubject from "../../component/Admin/CreateSubject";
import UserList from "../../component/Admin/UserList";
import ClassList from "../../component/Admin/ClassList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Setting from "../Setting";
import AboutUs from "../AboutUs";
import BottomTab from "../../component/Admin/Profile";
import Profile from "../../component/Admin/Profile";
import Logout from "../../component/Admin/Logout";
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
