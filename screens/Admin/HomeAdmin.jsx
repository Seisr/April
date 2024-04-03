import { Text } from "@rneui/themed";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateAccount from "../../component/Admin/CreateAccount";
import CreateSubject from "../../component/Admin/CreateSubject";
import UserList from "../../component/Admin/UserList";
import ClassList from "../../component/Admin/ClassList";

const Tab = createBottomTabNavigator();

const HomeAdmin = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="createAccount" component={CreateAccount} />
        <Tab.Screen name="createSubject" component={CreateSubject} />
        <Tab.Screen name="userList" component={UserList} />
        <Tab.Screen name="classList" component={ClassList} />
      </Tab.Navigator>
    </>
  );
};

export default HomeAdmin;
