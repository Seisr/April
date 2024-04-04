import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Profile from "../../components/Admin/Profile";
import AboutUs from "../../components/Admin/AboutUs";
import Setting from "../../components/Admin/Setting";
import HomeAdmin from "../../components/Admin/HomeAdmin";
import { Alert } from "react-native";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainAdmin = () => {
  const navigation = useNavigation();

  const confirmAlert = (props) => {
    Alert.alert("Logging out", "Are you sure you want to log out?", [
      {
        text: "Yes",
        onPress: () => {
          props.navigation.navigate("Login");
        },
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                onPress={() => {
                  confirmAlert(props);
                }}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name="Home" component={HomeAdmin} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
      </Drawer.Navigator>
    </>
  );
};

export default MainAdmin;
