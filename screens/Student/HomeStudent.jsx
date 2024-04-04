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
        <Drawer.Screen name="ProfileStudent" component={ProfileStudent} />
        <Drawer.Screen name="SettingStudent" component={SettingStudent} />
        <Drawer.Screen name="AboutUsStudent" component={AboutUsStudent} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeTeacher;
