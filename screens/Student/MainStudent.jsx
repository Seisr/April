import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import AboutUsStudent from "../../components/Student/AboutUsStudent";
import ProfileStudent from "../../components/Student/ProfileStudent";
import SettingStudent from "../../components/Student/SettingStudent";
import HomeStudent from "../../components/Student/HomeStudent";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainStudent = () => {
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
        <Drawer.Screen name="HomeStudent" component={HomeStudent} />
        <Drawer.Screen name="ProfileStudent" component={ProfileStudent} />
        <Drawer.Screen name="SettingStudent" component={SettingStudent} />
        <Drawer.Screen name="AboutUsStudent" component={AboutUsStudent} />
      </Drawer.Navigator>
    </>
  );
};

export default MainStudent;
