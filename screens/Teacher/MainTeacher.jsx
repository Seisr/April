import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import AboutUsTeacher from "../../components/Teacher/AboutUsTeacher";
import ProfileTeacher from "../../components/Teacher/ProfileTeacher";
import SettingTeacher from "../../components/Teacher/SettingTeacher";
import HomeTeacher from "../../components/Teacher/HomeTeacher";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainTeacher = () => {
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
        <Drawer.Screen name="HomeTeacher" component={HomeTeacher} />
        <Drawer.Screen name="ProfileTeacher" component={ProfileTeacher} />
        <Drawer.Screen name="SettingTeacher" component={SettingTeacher} />
        <Drawer.Screen name="AboutUsTeacher" component={AboutUsTeacher} />
      </Drawer.Navigator>
    </>
  );
};

export default MainTeacher;
