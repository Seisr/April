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
import AboutUs from "../AboutUs";
import Setting from "../Setting";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTeacher = () => {
  const navigation = useNavigation();

  return (
    <>
      {/* <Drawer.Navigator initialRouteName="BottomTab">
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <DrawerItem label="logout2" onPress={()=> }
      </Drawer.Navigator> */}

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
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeTeacher;
