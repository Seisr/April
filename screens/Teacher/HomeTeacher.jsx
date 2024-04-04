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
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTeacher = () => {
  const navigation = useNavigation();

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
                onPress={() => props.navigation.navigate("Login")}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name="ProfileTeacher" component={ProfileTeacher} />
        <Drawer.Screen name="SettingTeacher" component={SettingTeacher} />
        <Drawer.Screen name="AboutUsTeacher" component={AboutUsTeacher} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeTeacher;
