import { Text } from "@rneui/themed";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
const Tab = createBottomTabNavigator();

const Login = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="screen1" component={Screen1} />
        <Tab.Screen name="screen2" component={Screen2} />
      </Tab.Navigator>
    </>
  );
};

export default Login;
