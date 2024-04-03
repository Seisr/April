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
import BottomTab from "../../component/Admin/BottomTab";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeAdmin = () => {
  return (
    <>
      {/* <BottomTab /> */}
      <Drawer.Navigator initialRouteName="BottomTab">
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen name="BottomTab" component={BottomTab} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeAdmin;
