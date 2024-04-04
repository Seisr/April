import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ClassRegister from "./ClassRegister";
import GPA from "./GPA";

const Tab = createBottomTabNavigator();

const HomeStudent = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Class Register"
        component={ClassRegister}
        options={{
          tabBarIcon: () => <Icon name="add-outline" />,
        }}
      />
      <Tab.Screen
        name="GPA"
        component={GPA}
        options={{
          tabBarIcon: () => <Icon name="stats-chart-outline" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStudent;
